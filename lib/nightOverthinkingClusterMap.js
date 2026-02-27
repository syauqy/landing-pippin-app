/**
 * Night Overthinking Cluster Map
 * Defines all related articles within the cluster with contextual anchor text
 * Used for intelligent internal linking in pillar page
 */

export const nightOverthinkingClusterMap = {
  "why-you-overthink-at-night": {
    title:
      "Why You Overthink at Night (And How Mental Quiet Becomes Mental Noise)",
    url: "/blog/night-overthinking/why-you-overthink-at-night",
    anchors: [
      "why your mind races at night",
      "the psychology of nighttime overthinking",
      "how external quiet amplifies internal thoughts",
    ],
    relevantSections: ["The Quiet Amplifies Everything", "Pattern Recognition"],
  },
  "racing-thoughts-before-sleep": {
    title: "Racing Thoughts Before Sleep (Practical Ways to Calm Your Mind)",
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
};

/**
 * Get a random anchor for a given article slug
 * Ensures variety in link text across multiple mentions
 * @param {string} slug - Article slug
 * @param {Array} usedAnchors - Anchors already used to avoid repeats
 * @returns {string|null} Random anchor text or null if all used
 */
export function getRandomAnchor(slug, usedAnchors = []) {
  const article = nightOverthinkingClusterMap[slug];
  if (!article) return null;

  const availableAnchors = article.anchors.filter(
    (anchor) => !usedAnchors.includes(anchor),
  );

  if (availableAnchors.length === 0) return null;

  return availableAnchors[Math.floor(Math.random() * availableAnchors.length)];
}

/**
 * Get all articles in the cluster except a given one
 * @param {string} excludeSlug - Slug to exclude
 * @returns {Array} Array of article configs
 */
export function getRelatedClusterArticles(excludeSlug) {
  return Object.entries(nightOverthinkingClusterMap)
    .filter(([slug]) => slug !== excludeSlug)
    .map(([slug, config]) => ({ slug, ...config }));
}
