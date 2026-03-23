/**
 * Tag Consolidation System
 * Maps 66+ fragmented tags to 12 core categories for cleaner UX
 */

// Define the consolidated tag taxonomy
export const TAG_CONSOLIDATION_MAP = {
  // Sleep-related tags -> "Sleep"
  sleep: [
    "sleep",
    "sleeplessness",
    "sleep quality",
    "sleep support",
    "sleep disorders",
    "sleep improvement",
  ],

  // Mindfulness & meditation practices -> "Mindfulness"
  mindfulness: [
    "mindfulness",
    "Mindfulness",
    "daily well-being",
    "restoration",
  ],

  // Overthinking & rumination -> "Overthinking"
  overthinking: [
    "overthinking",
    "rumination",
    "night overthinking",
    "nightly thoughts",
    "mental loops",
    "thought spirals",
  ],

  // Anxiety & tension -> "Anxiety"
  anxiety: [
    "anxiety",
    "nighttime anxiety",
    "sleep anxiety",
    "anxiety management",
    "anxiety coping",
  ],

  // Intrusive/racing thoughts -> "Racing Thoughts"
  "racing thoughts": [
    "racing thoughts",
    "intrusive thoughts",
    "nighttime mental chatter",
    "night thoughts",
    "cognitive arousal",
  ],

  // Mental wellness & health -> "Mental Wellness"
  "mental wellness": [
    "mental well-being",
    "mental wellness",
    "mental health",
    "emotional wellness",
    "mental clarity",
  ],

  // Sleep routine & habits -> "Sleep Hygiene"
  "sleep hygiene": [
    "sleep hygiene",
    "bedtime routine",
    "evening routine",
    "pre-sleep routine",
    "night routine",
  ],

  // Stress & worry management -> "Stress Management"
  "stress management": [
    "stress management",
    "stress reduction",
    "worry",
    "overwhelm",
  ],

  // Calm, peace, relaxation -> "Calm & Relaxation"
  "calm & relaxation": [
    "calm",
    "tranquility",
    "relaxation",
    "peace",
    "restful sleep",
    "self-soothing",
  ],

  // Insomnia-specific -> "Insomnia"
  insomnia: ["insomnia", "insomnia coping"],

  // Cognitive & behavioral techniques -> "Techniques"
  techniques: [
    "brain dump",
    "journaling",
    "cognitive offloading",
    "cognitive rest",
    "cognitive function",
    "self-compassion",
  ],

  // Mental peace/relaxation techniques -> "Mental Peace"
  "mental peace": [
    "mental peace",
    "mental calm",
    "mental patterns",
    "mental relaxation",
    "mental-wellbeing",
    "mental chatter",
  ],
};

/**
 * Reverse map: tag -> core category
 * Built lazily for performance
 */
let reverseMap = null;

function getReverseMap() {
  if (reverseMap) return reverseMap;

  reverseMap = {};
  Object.entries(TAG_CONSOLIDATION_MAP).forEach(([coreTag, variantTags]) => {
    variantTags.forEach((variant) => {
      reverseMap[variant.toLowerCase()] = coreTag;
    });
  });
  return reverseMap;
}

/**
 * Consolidate a single tag to its core category
 * @param {string} tag - Original tag
 * @returns {string} Consolidated core tag
 */
export function consolidateTag(tag) {
  const reverseMap = getReverseMap();
  const normalized = tag.toLowerCase();
  return reverseMap[normalized] || tag; // Return original if no mapping found
}

/**
 * Get list of core tags (for UI display)
 * @returns {Array} Sorted array of core tag names
 */
export function getCoreTagsList() {
  return Object.keys(TAG_CONSOLIDATION_MAP).sort();
}

/**
 * Consolidate a set of tags to unique core tags
 * @param {Array} tags - Array of original tags
 * @returns {Array} Array of unique consolidated core tags
 */
export function consolidateTags(tags) {
  if (!Array.isArray(tags)) return [];

  const consolidated = new Set();
  tags.forEach((tag) => {
    const core = consolidateTag(tag);
    // Only add core tag if it exists in our consolidation map (not unmapped tags)
    if (Object.keys(TAG_CONSOLIDATION_MAP).includes(core)) {
      consolidated.add(core);
    }
  });
  return Array.from(consolidated).sort();
}
