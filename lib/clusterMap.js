/**
 * Universal Cluster Map
 * Defines topical silos, pillar pages, and related articles for intelligent internal linking
 * Each cluster operates as an isolated SEO silo with pillar → article relationships
 */

export const clusterMap = {
  "night-overthinking": {
    name: "Overthinking at Night",
    pillar: {
      title: "Why You Can't Stop Overthinking at Night",
      url: "/blog/night-overthinking",
      description: "Comprehensive guide to nighttime overthinking patterns",
    },
    articles: {
      "why-you-overthink-at-night": {
        title:
          "Why You Overthink at Night (And How Mental Quiet Becomes Mental Noise)",
        url: "/blog/night-overthinking/why-you-overthink-at-night",
        anchors: [
          "why your mind races at night",
          "the psychology of nighttime overthinking",
          "how external quiet amplifies internal thoughts",
        ],
        relevantSections: [
          "The Quiet Amplifies Everything",
          "Pattern Recognition",
        ],
      },
      "racing-thoughts-before-sleep": {
        title:
          "Racing Thoughts Before Sleep (Practical Ways to Calm Your Mind)",
        url: "/blog/night-overthinking/racing-thoughts-before-sleep",
        anchors: [
          "practical strategies for racing thoughts",
          "how to calm a restless mind at bedtime",
          "grounding techniques for sleep",
        ],
        relevantSections: [
          "What Actually Helps",
          "Use Physical Grounding",
          "Brain Dump",
        ],
      },
      "overthinking-and-insomnia": {
        title:
          "Overthinking and Insomnia (Breaking the Mental Loop That Keeps You Awake)",
        url: "/blog/night-overthinking/overthinking-and-insomnia",
        anchors: [
          "the overthinking-insomnia cycle",
          "how mental loops affect sleep quality",
          "breaking the cycle of sleeplessness",
        ],
        relevantSections: [
          "The Relationship Between Overthinking and Sleep Quality",
          "The Feedback Loop",
        ],
      },
    },
  },
  // Additional clusters can be added here as blog expands
  // Example structure:
  // "morning-anxiety": {
  //   name: "Morning Anxiety",
  //   pillar: { ... },
  //   articles: { ... }
  // }
};

/**
 * Get cluster configuration
 * @param {string} clusterSlug - Cluster identifier
 * @returns {Object|null} Cluster config or null if not found
 */
export function getCluster(clusterSlug) {
  return clusterMap[clusterSlug] || null;
}

/**
 * Get pillar page for a cluster
 * @param {string} clusterSlug - Cluster identifier
 * @returns {Object|null} Pillar config or null if not found
 */
export function getPillarForCluster(clusterSlug) {
  const cluster = getCluster(clusterSlug);
  return cluster ? cluster.pillar : null;
}

/**
 * Get all articles in a cluster except a specific one
 * @param {string} clusterSlug - Cluster identifier
 * @param {string} excludeSlug - Article slug to exclude
 * @returns {Array} Array of article configs with slug keys
 */
export function getRelatedArticlesInCluster(clusterSlug, excludeSlug = null) {
  const cluster = getCluster(clusterSlug);
  if (!cluster || !cluster.articles) return [];

  return Object.entries(cluster.articles)
    .filter(([slug]) => slug !== excludeSlug)
    .map(([slug, config]) => ({ slug, ...config }));
}

/**
 * Get a random anchor for a given article
 * Ensures variety in link text across multiple mentions
 * @param {string} clusterSlug - Cluster identifier
 * @param {string} articleSlug - Article slug
 * @param {Array} usedAnchors - Anchors already used to avoid repeats
 * @returns {string|null} Random anchor text or null if all used
 */
export function getRandomAnchor(clusterSlug, articleSlug, usedAnchors = []) {
  const cluster = getCluster(clusterSlug);
  if (!cluster || !cluster.articles[articleSlug]) return null;

  const article = cluster.articles[articleSlug];
  const availableAnchors = article.anchors.filter(
    (anchor) => !usedAnchors.includes(anchor),
  );

  if (availableAnchors.length === 0) return null;

  return availableAnchors[Math.floor(Math.random() * availableAnchors.length)];
}

/**
 * Get article configuration by slug
 * @param {string} clusterSlug - Cluster identifier
 * @param {string} articleSlug - Article slug
 * @returns {Object|null} Article config or null if not found
 */
export function getArticleInCluster(clusterSlug, articleSlug) {
  const cluster = getCluster(clusterSlug);
  if (!cluster || !cluster.articles) return null;

  return cluster.articles[articleSlug] || null;
}

/**
 * Validate if cluster and article slug combination is valid
 * @param {string} clusterSlug - Cluster identifier
 * @param {string} articleSlug - Article slug
 * @returns {boolean} True if valid combination
 */
export function validateClusterArticle(clusterSlug, articleSlug) {
  const cluster = getCluster(clusterSlug);
  if (!cluster || !cluster.articles) return false;

  return articleSlug in cluster.articles;
}

/**
 * Get all valid clusters
 * @returns {Array} Array of cluster slugs
 */
export function getAllClusters() {
  return Object.keys(clusterMap);
}
