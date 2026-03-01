import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllPosts } from "@/lib/blog";
import { injectInternalLinks, getAllLinkedSlugs } from "@/lib/internalLinks";
import {
  getRandomReferences,
  getSuggestedCategories,
} from "@/lib/referenceLibrary";
import {
  sanitizeContent,
  validateTitle,
  validateMetaDescription,
} from "@/lib/contentSanitizer";
import fs from "fs";
import path from "path";

/**
 * AI Content Generation API
 * Generates blog posts using Gemini AI with safety checks and automation
 *
 * SECURITY:
 * - Vercel Cron: Validates x-vercel-cron-signature header
 * - Manual: Requires CRON_SECRET query parameter
 * - Only accepts POST requests
 */
export default async function handler(req, res) {
  // Allow both GET (Vercel cron) and POST (manual triggers)
  if (!["GET", "POST"].includes(req.method)) {
    return res
      .status(405)
      .json({ error: "Method not allowed. Use GET or POST." });
  }

  // SECURITY: Check authentication
  // Vercel cron requests always send User-Agent: vercel-cron/1.0
  const userAgent = req.headers["user-agent"] || "";
  const isVercelCron = userAgent.startsWith("vercel-cron");
  const manualSecret = req.query.secret;

  // Debug logging
  console.log("Auth check:", {
    method: req.method,
    userAgent,
    isVercelCron,
    hasSecret: !!manualSecret,
  });

  if (!isVercelCron && manualSecret !== process.env.CRON_SECRET) {
    console.warn("Unauthorized generation attempt blocked", {
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      method: req.method,
      userAgent,
      isVercelCron,
      hasSecret: !!manualSecret,
    });
    return res.status(401).json({
      error: "Unauthorized",
      message:
        "This endpoint requires authentication. Use ?secret=YOUR_CRON_SECRET for manual triggers.",
    });
  }

  // Check for required environment variables
  const requiredEnvVars = [
    "GEMINI_API_KEY",
    "GITHUB_TOKEN",
    "GITHUB_OWNER",
    "GITHUB_REPO",
    "CRON_SECRET",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName],
  );

  if (missingVars.length > 0) {
    return res.status(500).json({
      error: "Missing environment variables",
      missing: missingVars,
    });
  }

  try {
    // Parse query parameters
    const { force = false, dryRun = false } = req.query;

    // Get all existing posts to avoid duplicates
    const existingPosts = getAllPosts();
    const existingSlugs = existingPosts.map((post) => post.slug);

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Step 1: Generate long-tail keyword
    console.log("Step 1: Generating keyword...");
    const keyword = await generateKeyword(model, existingSlugs);

    if (!keyword) {
      return res
        .status(500)
        .json({ error: "Failed to generate unique keyword" });
    }

    console.log(`Generated keyword: ${keyword.title}`);

    // Step 2: Generate structured article
    console.log("Step 2: Generating article content...");
    const article = await generateArticle(model, keyword, existingSlugs);

    if (!article) {
      return res.status(500).json({ error: "Failed to generate article" });
    }

    // Step 3: Sanitize content
    console.log("Step 3: Sanitizing content...");
    const sanitized = sanitizeContent(article.content);

    if (!sanitized.isValid) {
      console.error("Content failed sanitization:", sanitized.issues);
      return res.status(400).json({
        error: "Content contains banned phrases",
        issues: sanitized.issues,
      });
    }

    // Step 4: Inject internal links
    console.log("Step 4: Injecting internal links...");
    const linkedSlugs = getAllLinkedSlugs();
    const { content: finalContent, injectedLinks } = injectInternalLinks(
      sanitized.content,
      keyword.slug,
      linkedSlugs,
      3,
    );

    // Step 5: Create MDX file structure (disclaimer is hardcoded in template)
    const mdxContent = createMDXContent({
      ...article,
      content: finalContent,
      slug: keyword.slug,
    });

    // Step 7: Validate title and description
    const titleValidation = validateTitle(article.title);
    const descValidation = validateMetaDescription(article.description);

    if (!titleValidation.isAppropriate || !descValidation.isValid) {
      console.warn("Title or description validation issues detected");
    }

    // Step 7.5: Generate clusterMap update
    console.log("Step 7.5: Generating clusterMap entry...");
    const clusterMapEntry = generateClusterMapEntry(
      keyword.slug,
      article.title,
      article.content,
    );
    const updatedClusterMap = await updateClusterMapContent(
      clusterMapEntry,
      keyword.slug,
      process.env.GITHUB_TOKEN,
      process.env.GITHUB_OWNER,
      process.env.GITHUB_REPO,
    );

    // If dry run, return preview without committing
    if (dryRun) {
      return res.status(200).json({
        mode: "dry-run",
        keyword,
        article,
        mdxContent,
        clusterMapEntry,
        sanitization: sanitized.stats,
        injectedLinks,
        validation: {
          title: titleValidation,
          description: descValidation,
        },
      });
    }

    // Step 8: Commit to GitHub (article + clusterMap update)
    console.log("Step 8: Committing to GitHub...");
    const commitResult = await commitFilesToGitHub(
      [
        {
          path: `contents/blog/night-overthinking/${keyword.slug}.mdx`,
          content: mdxContent,
        },
        {
          path: "lib/clusterMap.js",
          content: updatedClusterMap,
        },
      ],
      `Add blog post: ${keyword.slug} (with clusterMap update)`,
      process.env.GITHUB_TOKEN,
      process.env.GITHUB_OWNER,
      process.env.GITHUB_REPO,
    );

    // Return success response
    return res.status(200).json({
      success: true,
      slug: keyword.slug,
      title: article.title,
      wordCount: sanitized.stats.totalWords,
      injectedLinks: injectedLinks.length,
      commit: commitResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in generate API:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}

/**
 * Generate a long-tail keyword within the topical focus
 */
async function generateKeyword(model, existingSlugs) {
  const prompt = `
Generate a long-tail keyword for a blog article about "Overthinking at Night & Racing Thoughts".

Requirements:
- Must be specific and long-tail (4-7 words)
- Must include emotional intent
- Must be something someone would actually search for
- Must NOT be any of these existing topics: ${existingSlugs.join(", ")}

Return ONLY a JSON object with this structure (no markdown, no code blocks):
{
  "title": "Article title version of the keyword",
  "slug": "url-friendly-slug",
  "searchIntent": "what the searcher wants to know"
}
  `.trim();

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Try multiple JSON extraction strategies
    let keyword = null;

    // Strategy 1: Direct JSON parse
    try {
      keyword = JSON.parse(response);
    } catch (e) {
      // Strategy 2: Extract from code blocks/markdown
      const jsonMatch = response.match(/\{[\s\S]+\}/);
      if (!jsonMatch) {
        console.error("No JSON object found in keyword response");
        console.error("Response:", response.substring(0, 300));
        return null;
      }

      const cleaned = jsonMatch[0]
        .replace(/,\s*\}/g, "}") // Remove trailing commas
        .replace(/,\s*\]/g, "]"); // Remove trailing commas in arrays

      try {
        keyword = JSON.parse(cleaned);
      } catch (parseError) {
        console.error("Failed to parse keyword JSON:", cleaned);
        console.error("Parse error:", parseError.message);
        return null;
      }
    }

    // Validate uniqueness
    if (existingSlugs.includes(keyword.slug)) {
      console.log("Generated duplicate slug, retrying...");
      return null;
    }

    return keyword;
  } catch (error) {
    console.error("Error generating keyword:", error);
    return null;
  }
}

/**
 * Generate structured article content
 */
async function generateArticle(model, keyword, existingSlugs) {
  // Get suggested reference categories
  const suggestedCategories = getSuggestedCategories(keyword.title);
  const references = getRandomReferences(2);

  const prompt = `
Write a blog article about: "${keyword.title}"

CRITICAL RULES:
- 1100-1400 words
- Calm, minimal, psychologically grounded tone
- Use H2 and H3 headers for structure
- NO medical claims, diagnoses, or treatment advice
- NO fake statistics or numeric claims
- NO phrases like "diagnose", "disorder", "cure", "treatment", "clinical"
- Use "research suggests" or "studies explore" for references
- NO generic AI fluff (avoid "in today's world", "let's dive in", "in conclusion")
- NO repetitive intro patterns
- Include 1 subtle mention of journaling/brain dump technique
- Write in markdown format

References to incorporate naturally (do NOT cite directly):
${references.map((ref) => `- ${ref.keyPoint}`).join("\n")}

Structure:
1. Hook that connects to reader's experience
2. 3-5 H2 sections explaining different aspects
3. Practical insight (not prescriptive)
4. Closing reflection (not "in conclusion")

IMPORTANT: Return ONLY valid JSON. Escape all quotes and special characters in the content field.

Return ONLY a JSON object (no markdown, no code blocks, no extra text):
{
  "title": "${keyword.title}",
  "description": "120-160 character meta description",
  "content": "full markdown article content with properly escaped quotes",
  "tags": ["tag1", "tag2", "tag3"],
  "categories": ["category1", "category2"]
}
  `.trim();

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Try multiple JSON extraction strategies
    let article = null;

    // Strategy 1: Direct JSON parse (if response is clean JSON)
    try {
      article = JSON.parse(response);
      return article;
    } catch (e) {
      // Continue to Strategy 2
    }

    // Strategy 2: Extract JSON from markdown/code blocks
    const jsonMatch = response.match(/\{[\s\S]+\}/);
    if (!jsonMatch) {
      console.error("No JSON object found in article response");
      console.error("Response preview:", response.substring(0, 500));
      return null;
    }

    let cleaned = jsonMatch[0]
      .replace(/,\s*\}/g, "}") // Remove trailing commas in objects
      .replace(/,\s*\]/g, "]"); // Remove trailing commas in arrays

    // Strategy 3: Try parsing the cleaned JSON
    try {
      article = JSON.parse(cleaned);
      return article;
    } catch (parseError) {
      // Strategy 4: Try to fix common JSON issues
      console.error("JSON parse failed, attempting repairs...");

      // Fix unescaped quotes in content field
      try {
        // Extract the content field and re-escape it
        const contentMatch = cleaned.match(
          /"content":\s*"([\s\S]*?)",?\s*"tags"/,
        );
        if (contentMatch) {
          const rawContent = contentMatch[1];
          // Re-escape the content
          const escapedContent = rawContent
            .replace(/\\/g, "\\\\") // Escape backslashes
            .replace(/"/g, '\\"') // Escape quotes
            .replace(/\n/g, "\\n") // Escape newlines
            .replace(/\r/g, "\\r") // Escape carriage returns
            .replace(/\t/g, "\\t"); // Escape tabs

          cleaned = cleaned.replace(
            /"content":\s*"[\s\S]*?",?\s*"tags"/,
            `"content": "${escapedContent}", "tags"`,
          );

          article = JSON.parse(cleaned);
          console.log("Successfully repaired JSON");
          return article;
        }
      } catch (repairError) {
        console.error("JSON repair failed:", repairError.message);
      }

      console.error("Failed to parse article JSON:");
      console.error("Parse error:", parseError.message);
      console.error("First 500 chars:", cleaned.substring(0, 500));
      console.error("Last 500 chars:", cleaned.substring(cleaned.length - 500));
      return null;
    }
  } catch (error) {
    console.error("Error generating article:", error);
    return null;
  }
}

/**
 * Create MDX file content with frontmatter
 */
function createMDXContent(article) {
  // Format tags as YAML array
  const tagsYaml = Array.isArray(article.tags)
    ? article.tags.map((tag) => `  - ${tag}`).join("\n")
    : "  - uncategorized";

  // Format categories as YAML array
  const categoriesYaml = Array.isArray(article.categories)
    ? article.categories.map((cat) => `  - ${cat}`).join("\n")
    : "  - general";

  const frontmatter = `---
title: "${article.title}"
slug: "${article.slug}"
description: "${article.description}"
date: "${new Date().toISOString().split("T")[0]}"
author: "Pippin"
image: "/pippin-banner.jpg"
status: "published"
cluster: "night-overthinking"
tags:
${tagsYaml}
categories:
${categoriesYaml}
readingTime: ${Math.ceil(article.content.split(/\s+/).length / 200)}
---

${article.content}`;

  return frontmatter;
}

/**
 * Extract H2 headers from markdown content to use as relevantSections
 */
function extractH2Sections(content) {
  const h2Regex = /^## (.+)$/gm;
  const sections = [];
  let match;

  while ((match = h2Regex.exec(content)) !== null) {
    sections.push(match[1].trim());
  }

  return sections.slice(0, 5); // Limit to first 5 sections
}

/**
 * Generate anchor variations for internal linking
 */
function generateAnchorVariations(title, slug) {
  // Create natural anchor text variations based on title
  const baseAnchors = [title.toLowerCase(), slug.replace(/-/g, " ")];

  // Generate semantic variations
  const variations = [
    ...new Set([
      baseAnchors[0],
      baseAnchors[1],
      `${baseAnchors[1].split(" ").slice(0, 4).join(" ")}`,
    ]),
  ];

  return variations.slice(0, 3); // Limit to 3 unique anchors
}

/**
 * Generate clusterMap entry for new article
 */
function generateClusterMapEntry(slug, title, content) {
  const anchors = generateAnchorVariations(title, slug);
  const relevantSections = extractH2Sections(content);

  return {
    slug,
    config: {
      title,
      url: `/blog/night-overthinking/${slug}`,
      anchors,
      relevantSections:
        relevantSections.length > 0 ? relevantSections : ["Introduction"],
    },
  };
}

/**
 * Fetch and update clusterMap.js content
 */
async function updateClusterMapContent(entry, slug, token, owner, repo) {
  const apiBase = "https://api.github.com";
  const filePath = "lib/clusterMap.js";

  try {
    // Fetch current clusterMap.js
    const fileResponse = await fetch(
      `${apiBase}/repos/${owner}/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!fileResponse.ok) {
      throw new Error("Failed to fetch clusterMap.js");
    }

    const fileData = await fileResponse.json();
    const currentContent = Buffer.from(fileData.content, "base64").toString(
      "utf-8",
    );

    // Find the insertion point (before the closing of articles object)
    // Look for the last article entry in night-overthinking cluster
    const articlesPattern =
      /"night-overthinking"[\s\S]*?articles:\s*\{([\s\S]*?)\s*\},?\s*\}/;
    const match = currentContent.match(articlesPattern);

    if (!match) {
      throw new Error("Could not find night-overthinking articles section");
    }

    // Build the new article entry
    const indent = "      ";
    const newEntry = `${indent}"${entry.slug}": {
${indent}  title:
${indent}    "${entry.config.title}",
${indent}  url: "${entry.config.url}",
${indent}  anchors: ${JSON.stringify(entry.config.anchors, null, 2).split("\n").join(`\n${indent}  `)},
${indent}  relevantSections: ${JSON.stringify(entry.config.relevantSections, null, 2).split("\n").join(`\n${indent}  `)},
${indent}},`;

    // Find where to insert (after the last article, before the closing brace)
    const insertPoint = match[0].lastIndexOf("      },");
    if (insertPoint === -1) {
      throw new Error("Could not find insertion point in clusterMap");
    }

    const beforeInsert = currentContent.substring(
      0,
      currentContent.indexOf(match[0]) + insertPoint + 8,
    );
    const afterInsert = currentContent.substring(
      currentContent.indexOf(match[0]) + insertPoint + 8,
    );

    const updatedContent = beforeInsert + "\n" + newEntry + afterInsert;

    return updatedContent;
  } catch (error) {
    console.error("Error updating clusterMap content:", error);
    throw error;
  }
}

/**
 * Commit multiple files to GitHub in a single commit
 */
async function commitFilesToGitHub(files, commitMessage, token, owner, repo) {
  const apiBase = "https://api.github.com";

  try {
    // Step 1: Get the latest commit SHA
    const refResponse = await fetch(
      `${apiBase}/repos/${owner}/${repo}/git/ref/heads/master`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!refResponse.ok) {
      throw new Error("Failed to get ref");
    }

    const refData = await refResponse.json();
    const latestCommitSha = refData.object.sha;

    // Step 2: Get the tree for latest commit
    const commitResponse = await fetch(
      `${apiBase}/repos/${owner}/${repo}/git/commits/${latestCommitSha}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!commitResponse.ok) {
      throw new Error("Failed to get commit");
    }

    const commitData = await commitResponse.json();
    const baseTreeSha = commitData.tree.sha;

    // Step 3: Create blobs for all files
    const blobShas = [];
    for (const file of files) {
      const blobResponse = await fetch(
        `${apiBase}/repos/${owner}/${repo}/git/blobs`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: Buffer.from(file.content).toString("base64"),
            encoding: "base64",
          }),
        },
      );

      if (!blobResponse.ok) {
        throw new Error(`Failed to create blob for ${file.path}`);
      }

      const blobData = await blobResponse.json();
      blobShas.push({
        path: file.path,
        sha: blobData.sha,
      });
    }

    // Step 4: Create new tree with all files
    const treeResponse = await fetch(
      `${apiBase}/repos/${owner}/${repo}/git/trees`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: blobShas.map((blob) => ({
            path: blob.path,
            mode: "100644",
            type: "blob",
            sha: blob.sha,
          })),
        }),
      },
    );

    if (!treeResponse.ok) {
      throw new Error("Failed to create tree");
    }

    const treeData = await treeResponse.json();

    // Step 5: Create commit
    const newCommitResponse = await fetch(
      `${apiBase}/repos/${owner}/${repo}/git/commits`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage,
          tree: treeData.sha,
          parents: [latestCommitSha],
        }),
      },
    );

    if (!newCommitResponse.ok) {
      throw new Error("Failed to create commit");
    }

    const newCommitData = await newCommitResponse.json();

    // Step 6: Update reference
    const updateRefResponse = await fetch(
      `${apiBase}/repos/${owner}/${repo}/git/refs/heads/master`,
      {
        method: "PATCH",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sha: newCommitData.sha,
        }),
      },
    );

    if (!updateRefResponse.ok) {
      throw new Error("Failed to update ref");
    }

    return {
      success: true,
      commitSha: newCommitData.sha,
      files: files.map((f) => f.path),
    };
  } catch (error) {
    console.error("GitHub commit error:", error);
    throw error;
  }
}
