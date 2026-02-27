/**
 * Internal Links System
 *
 * This module manages internal linking between blog posts to improve SEO
 * and user engagement. It provides anchor text variations and prevents
 * duplicate or self-linking.
 */

/**
 * Anchor map for internal linking with cluster-based URLs
 * Each entry represents a post with multiple natural anchor text options
 */
export const internalLinksMap = [
  {
    pillar: "night-overthinking",
    cluster: "night-overthinking",
    slug: "why-you-overthink-at-night",
    url: "/blog/night-overthinking/why-you-overthink-at-night",
    anchors: [
      "why overthinking gets worse at night",
      "night-time racing thoughts explained",
      "why your thoughts get louder before sleep",
      "understanding nighttime mental noise",
      "what makes thoughts race at bedtime",
    ],
  },
  {
    pillar: "night-overthinking",
    cluster: "night-overthinking",
    slug: "racing-thoughts-before-sleep",
    url: "/blog/night-overthinking/racing-thoughts-before-sleep",
    anchors: [
      "racing thoughts before sleep",
      "why your mind races when you lie down",
      "the science behind pre-sleep racing thoughts",
      "calming a restless mind at bedtime",
      "managing thoughts that won't stop at night",
    ],
  },
  {
    pillar: "night-overthinking",
    cluster: "night-overthinking",
    slug: "overthinking-and-insomnia",
    url: "/blog/night-overthinking/overthinking-and-insomnia",
    anchors: [
      "overthinking and insomnia",
      "how mental loops affect sleep",
      "the connection between thinking and sleeplessness",
      "breaking the overthinking-insomnia cycle",
      "when racing thoughts prevent sleep",
    ],
  },
];

/**
 * Get random anchor text for a given slug
 * @param {string} slug - The post slug to get anchor for
 * @param {Array} usedAnchors - Array of anchors already used in this article
 * @returns {string|null} Random anchor text or null if none available
 */
export function getRandomAnchor(slug, usedAnchors = []) {
  const linkData = internalLinksMap.find((link) => link.slug === slug);

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
 * Excludes the current post and respects linking limits
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
  // Filter out current post and non-existent posts
  const eligible = internalLinksMap.filter(
    (link) =>
      link.slug !== currentSlug &&
      (existingSlugs.length === 0 || existingSlugs.includes(link.slug)),
  );

  // Shuffle and limit to maxLinks
  const shuffled = eligible.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, maxLinks);
}

/**
 * Inject internal links into article content
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
    const anchor = getRandomAnchor(linkData.slug, usedAnchors);

    if (!anchor) return;

    // Create markdown link
    const markdownLink = `[${anchor}](${linkData.url})`;

    // Check if content contains the anchor text (case insensitive)
    const regex = new RegExp(`\\b${anchor}\\b`, "i");
    const match = modifiedContent.match(regex);

    if (match) {
      // Replace first occurrence only
      modifiedContent = modifiedContent.replace(match[0], markdownLink);
      usedAnchors.push(anchor);
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
 * @param {Object} linkData - Link data object
 * @returns {boolean} Success status
 */
export function addInternalLink(linkData) {
  const { pillar, slug, url, anchors } = linkData;

  // Validation
  if (
    !pillar ||
    !slug ||
    !url ||
    !Array.isArray(anchors) ||
    anchors.length === 0
  ) {
    console.error("Invalid link data structure");
    return false;
  }

  // Check for duplicates
  const exists = internalLinksMap.some((link) => link.slug === slug);
  if (exists) {
    console.warn(`Link with slug "${slug}" already exists`);
    return false;
  }

  internalLinksMap.push(linkData);
  return true;
}

/**
 * Get all slugs in the internal links map
 * @returns {Array} Array of all slugs
 */
export function getAllLinkedSlugs() {
  return internalLinksMap.map((link) => link.slug);
}

/**
 * Get links by pillar category
 * @param {string} pillar - Pillar category name
 * @returns {Array} Array of links in that pillar
 */
export function getLinksByPillar(pillar) {
  return internalLinksMap.filter((link) => link.pillar === pillar);
}
