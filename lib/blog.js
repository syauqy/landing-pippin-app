import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { consolidateTags, getCoreTagsList } from "./tagConsolidation.js";

const contentDirectory = path.join(process.cwd(), "contents", "blog");

/**
 * Get all blog posts from the contents/blog directory (supports cluster structure)
 * @returns {Array} Array of post objects with frontmatter, slug, and cluster
 */
export function getAllPosts() {
  // Create directory if it doesn't exist
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
    return [];
  }

  const posts = [];

  // Check for both flat structure and cluster subdirectories
  const entries = fs.readdirSync(contentDirectory, { withFileTypes: true });

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      // It's a cluster directory
      const clusterName = entry.name;
      const clusterPath = path.join(contentDirectory, clusterName);
      const clusterFiles = fs.readdirSync(clusterPath);

      clusterFiles
        .filter((file) => file.endsWith(".mdx"))
        .forEach((file) => {
          const slug = file.replace(/\.mdx$/, "");
          const fullPath = path.join(clusterPath, file);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          posts.push({
            slug,
            cluster: clusterName,
            frontmatter: data,
            content,
            readingTime: calculateReadingTime(content),
            isPillar: data.pillar === true || slug === "index",
          });
        });
    } else if (entry.name.endsWith(".mdx")) {
      // Flat structure (for backward compatibility)
      const slug = entry.name.replace(/\.mdx$/, "");
      const fullPath = path.join(contentDirectory, entry.name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      posts.push({
        slug,
        cluster: data.cluster || null,
        frontmatter: data,
        content,
        readingTime: calculateReadingTime(content),
        isPillar: data.pillar === true,
      });
    }
  });

  return posts;
}

/**
 * Get a single post by cluster and slug
 * @param {string} cluster - The cluster name
 * @param {string} slug - The post slug
 * @returns {Object} Post object with frontmatter, content, and metadata
 */
export function getPostBySlug(cluster, slug) {
  // If only one argument, treat it as slug for backward compatibility
  if (!slug) {
    slug = cluster;
    const flatPath = path.join(contentDirectory, `${slug}.mdx`);

    if (fs.existsSync(flatPath)) {
      const fileContents = fs.readFileSync(flatPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        cluster: data.cluster || null,
        frontmatter: data,
        content,
        readingTime: calculateReadingTime(content),
        isPillar: data.pillar === true,
      };
    }
    return null;
  }

  // Try cluster-based path
  const clusterPath = path.join(contentDirectory, cluster, `${slug}.mdx`);

  if (!fs.existsSync(clusterPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(clusterPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    cluster,
    frontmatter: data,
    content,
    readingTime: calculateReadingTime(content),
    isPillar: data.pillar === true || slug === "index",
  };
}

/**
 * Get all posts in a specific cluster
 * @param {string} cluster - The cluster name
 * @returns {Array} Array of posts in the cluster
 */
export function getPostsByCluster(cluster) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.cluster === cluster);
}

/**
 * Get pillar page for a cluster
 * @param {string} cluster - The cluster name
 * @returns {Object|null} Pillar post or null
 */
export function getPillarPage(cluster) {
  const clusterPath = path.join(contentDirectory, cluster, "index.mdx");

  if (!fs.existsSync(clusterPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(clusterPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: "index",
    cluster,
    frontmatter: data,
    content,
    readingTime: calculateReadingTime(content),
    isPillar: true,
  };
}

/**
 * Get all unique clusters
 * @returns {Array} Array of cluster names
 */
export function getAllClusters() {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(contentDirectory, { withFileTypes: true });
  const clusters = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  return clusters;
}

/**
 * Calculate reading time based on word count
 * @param {string} content - The post content
 * @returns {number} Estimated reading time in minutes
 */
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

/**
 * Filter posts to only return published posts
 * @param {Array} posts - Array of posts
 * @returns {Array} Filtered array of published posts
 */
export function filterPublishedPosts(posts) {
  return posts.filter(
    (post) =>
      post.frontmatter.status === "published" &&
      new Date(post.frontmatter.date) <= new Date(),
  );
}

/**
 * Sort posts by date in descending order
 * @param {Array} posts - Array of posts
 * @returns {Array} Sorted array of posts
 */
export function sortPostsByDate(posts) {
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
}

/**
 * Get all unique tags from posts
 * @param {Array} posts - Array of posts
 * @returns {Array} Array of consolidated core tags (sorted)
 */
export function getAllTags(posts) {
  const consolidatedTags = new Set();

  posts.forEach((post) => {
    if (post.frontmatter.tags && Array.isArray(post.frontmatter.tags)) {
      const coreTagsForPost = consolidateTags(post.frontmatter.tags);
      coreTagsForPost.forEach((tag) => consolidatedTags.add(tag));
    }
  });

  // Return sorted core tags for consistent UI display
  return Array.from(consolidatedTags).sort();
}

/**
 * Get all unique categories from posts
 * @param {Array} posts - Array of posts
 * @returns {Array} Array of unique categories
 */
export function getAllCategories(posts) {
  const categories = new Set();
  posts.forEach((post) => {
    if (
      post.frontmatter.categories &&
      Array.isArray(post.frontmatter.categories)
    ) {
      post.frontmatter.categories.forEach((cat) => categories.add(cat));
    }
  });
  return Array.from(categories);
}

/**
 * Filter posts by tag
 * @param {Array} posts - Array of posts
 * @param {string} tag - Tag to filter by
 * @returns {Array} Filtered posts
 */
export function filterPostsByTag(posts, tag) {
  return posts.filter(
    (post) => post.frontmatter.tags && post.frontmatter.tags.includes(tag),
  );
}

/**
 * Filter posts by category
 * @param {Array} posts - Array of posts
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered posts
 */
export function filterPostsByCategory(posts, category) {
  return posts.filter(
    (post) =>
      post.frontmatter.categories &&
      post.frontmatter.categories.includes(category),
  );
}

/**
 * Get all published posts sorted by date
 * @returns {Array} Array of published posts sorted by date
 */
export function getPublishedPosts() {
  const allPosts = getAllPosts();
  const published = filterPublishedPosts(allPosts);
  return sortPostsByDate(published);
}
