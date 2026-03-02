/**
 * Internal Links System
 *
 * This module manages internal linking between blog posts to improve SEO
 * and user engagement. It provides anchor text variations and prevents
 * duplicate or self-linking.
 */

import { getAllPosts } from "@/lib/blog";

/**
 * Build internal links map dynamically from actual posts
 * Includes both regular articles and pillar pages
 * @returns {Array} Array of link objects with URLs and anchor text
 */
export function buildInternalLinksMap() {
  const posts = getAllPosts();
  const linksMap = [];

  posts.forEach((post) => {
    const { slug, cluster, frontmatter } = post;

    // Skip unpublished posts
    if (frontmatter.status !== "published") return;

    // Determine if this is a pillar article
    const isPillar = post.isPillar;

    // Build URL based on whether it's a pillar or regular article
    let url;
    if (isPillar) {
      // Pillar articles: /blog/cluster-name
      url = `/blog/${cluster}`;
    } else {
      // Regular articles: /blog/cluster-name/slug
      url = `/blog/${cluster}/${slug}`;
    }

    // Generate anchor text from metadata if available, otherwise from title
    const title = frontmatter.title || slug;
    const defaultAnchors = generateDefaultAnchors(
      title,
      slug,
      isPillar,
      cluster,
    );
    const anchors = frontmatter.internalLinkAnchors || defaultAnchors;

    linksMap.push({
      pillar: cluster,
      cluster,
      slug: isPillar ? "index" : slug,
      url,
      title,
      isPillar,
      anchors: Array.isArray(anchors) ? anchors : [anchors],
    });
  });

  return linksMap;
}

/**
 * Generate default anchor text from title and slug
 * @param {string} title - Article title
 * @param {string} slug - Article slug
 * @param {boolean} isPillar - Whether this is a pillar article
 * @param {string} cluster - Cluster name (used for pillar anchors)
 * @returns {Array} Array of suggested anchor texts
 */
function generateDefaultAnchors(title, slug, isPillar, cluster) {
  const anchors = [];

  // Add title-based anchors
  anchors.push(title.toLowerCase());

  // Add slug-based anchor (replace hyphens with spaces)
  const slugAnchor = slug.replace(/-/g, " ");
  if (slugAnchor !== title.toLowerCase()) {
    anchors.push(slugAnchor);
  }

  // For pillar articles, use the CLUSTER name (not "index") for anchor text
  if (isPillar && cluster) {
    const clusterWords = cluster.replace(/-/g, " ");
    anchors.push(clusterWords);
    anchors.push(`${clusterWords} guide`);
    anchors.push(`understanding ${clusterWords}`);
    anchors.push(`nighttime overthinking`);
    anchors.push(`overthinking at night`);
    anchors.push(`racing thoughts at night`);
  }

  return anchors;
}

/**
 * Get cached internal links map
 * @returns {Array} Array of link objects
 */
let cachedLinksMap = null;

export function getInternalLinksMap() {
  // Rebuild on each call to include newly generated articles
  // In production, could add cache with TTL for performance
  cachedLinksMap = buildInternalLinksMap();
  return cachedLinksMap;
}

/**
 * Get random anchor text for a given slug
 * @param {string} slug - The post slug to get anchor for
 * @param {Array} usedAnchors - Array of anchors already used in this article
 * @returns {string|null} Random anchor text or null if none available
 */
export function getRandomAnchor(slug, usedAnchors = []) {
  const linksMap = getInternalLinksMap();
  const linkData = linksMap.find((link) => link.slug === slug);

  if (!linkData) return null;

  // Filter out already used anchors
  const availableAnchors = linkData.anchors.filter(
    (anchor) => !usedAnchors.includes(anchor),
  );

  if (availableAnchors.length === 0) return null;

  // Return random anchor from available options
  const randomIndex = Math.floor(Math.random() * availableAnchors.length);
  return availableAnchors[randomIndex];
}

/**
 * Get eligible posts for internal linking
 * Includes existing articles and prioritizes pillar pages
 * @param {string} currentSlug - Current post slug (to avoid self-linking)
 * @param {Array} existingSlugs - Array of slugs that already exist
 * @param {number} maxLinks - Maximum number of internal links (default: 3)
 * @returns {Array} Array of eligible link objects
 */
export function getEligibleLinksForPost(
  currentSlug,
  existingSlugs = [],
  maxLinks = 3,
) {
  const linksMap = getInternalLinksMap();

  // Separate eligible links into pillar and regular articles
  const allEligible = linksMap.filter((link) => link.slug !== currentSlug);

  // If existingSlugs provided, filter to only existing posts
  let eligible;
  if (existingSlugs.length > 0) {
    eligible = allEligible.filter((link) => existingSlugs.includes(link.slug));
  } else {
    eligible = allEligible;
  }

  // Prioritize pillar articles (cluster index pages) for linking
  const pillarLinks = eligible.filter((link) => link.isPillar);
  const regularLinks = eligible.filter((link) => !link.isPillar);

  // Combine: pillar links first, then regular links
  const prioritized = [...pillarLinks, ...regularLinks];

  // Limit to maxLinks (prefer variety - mix pillar with regular)
  return prioritized.slice(0, maxLinks);
}

/**
 * Inject internal links into article content
 * Tries multiple matching strategies to find natural anchor text
 * @param {string} content - Article content to inject links into
 * @param {string} currentSlug - Current article slug
 * @param {Array} existingSlugs - Array of existing post slugs
 * @param {number} maxLinks - Maximum number of links to inject (default: 3)
 * @returns {Object} Object with modified content and metadata
 */
export function injectInternalLinks(
  content,
  currentSlug,
  existingSlugs = [],
  maxLinks = 3,
) {
  const eligibleLinks = getEligibleLinksForPost(
    currentSlug,
    existingSlugs,
    maxLinks,
  );

  if (eligibleLinks.length === 0) {
    return {
      content,
      injectedLinks: [],
    };
  }

  let modifiedContent = content;
  const usedAnchors = [];
  const injectedLinks = [];

  eligibleLinks.forEach((linkData) => {
    // Try each anchor text option
    let anchor = null;
    let matched = false;

    for (const potentialAnchor of linkData.anchors) {
      // Try exact match first (case-insensitive)
      const exactRegex = new RegExp(`\\b${potentialAnchor}\\b`, "i");
      const exactMatch = modifiedContent.match(exactRegex);

      if (exactMatch && !usedAnchors.includes(potentialAnchor)) {
        anchor = potentialAnchor;
        const replaced = modifiedContent.replace(
          exactMatch[0],
          `[${exactMatch[0]}](${linkData.url})`,
        );
        modifiedContent = replaced;
        usedAnchors.push(anchor);
        matched = true;
        break;
      }

      // Try partial match if it's a short phrase
      if (potentialAnchor.length > 3) {
        const partialWords = potentialAnchor
          .split(" ")
          .filter((w) => w.length > 3);
        if (partialWords.length > 0) {
          const partialRegex = new RegExp(
            partialWords.map((w) => `\\b${w}\\b`).join(".*?"),
            "i",
          );
          const partialMatch = modifiedContent.match(partialRegex);

          if (partialMatch && !usedAnchors.includes(potentialAnchor)) {
            anchor = potentialAnchor;
            // Replace the matched text
            modifiedContent = modifiedContent.replace(
              partialMatch[0],
              `[${partialMatch[0]}](${linkData.url})`,
            );
            usedAnchors.push(anchor);
            matched = true;
            break;
          }
        }
      }
    }

    if (matched && anchor) {
      injectedLinks.push({
        anchor,
        url: linkData.url,
        slug: linkData.slug,
      });
    }
  });

  return {
    content: modifiedContent,
    injectedLinks,
  };
}

/**
 * Add a new link to the internal links map
 * Used by the AI generation system to expand the link network
 * Note: With dynamic map, manually adding isn't needed - new posts auto-included
 * @param {Object} linkData - Link data object
 * @returns {boolean} Success status
 */
export function addInternalLink(linkData) {
  console.warn(
    "addInternalLink is deprecated - new posts are auto-included in dynamic map",
  );
  // With dynamic map, new posts are automatically included
  return true;
}

/**
 * Get all slugs in the internal links map
 * Includes both regular articles and pillar pages
 * @returns {Array} Array of all slugs
 */
export function getAllLinkedSlugs() {
  const linksMap = getInternalLinksMap();
  return linksMap.map((link) => link.slug);
}

/**
 * Get links by pillar category
 * @param {string} pillar - Pillar category name
 * @returns {Array} Array of links in that pillar
 */
export function getLinksByPillar(pillar) {
  const linksMap = getInternalLinksMap();
  return linksMap.filter((link) => link.pillar === pillar);
}
