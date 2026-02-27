/**
 * Reference Library
 *
 * Curated collection of safe, non-medical references for blog content.
 * All references avoid fake statistics, numeric claims, and medical diagnostic language.
 * Framed as "research suggests" rather than definitive medical claims.
 */

/**
 * Reference categories and their safe talking points
 */
export const referenceLibrary = {
  expressiveWriting: {
    topic: "Expressive Writing",
    keyPoints: [
      "Research suggests that writing about thoughts and emotions can help reduce mental clutter",
      "Studies on expressive writing indicate it may support emotional processing",
      "The practice of journaling has been explored as a way to externalize racing thoughts",
      "Writing as a form of cognitive offloading has been studied in psychology research",
      "Expressive writing may help people organize and understand their internal experiences",
    ],
    safeFraming: [
      "research suggests",
      "studies indicate",
      "psychological research explores",
      "evidence points to",
      "researchers have found",
    ],
  },

  cognitiveRestructuring: {
    topic: "Cognitive Restructuring",
    keyPoints: [
      "Cognitive behavioral approaches explore how thought patterns influence emotional states",
      "Research on cognitive restructuring looks at identifying and examining thought patterns",
      "The concept of challenging automatic thoughts is foundational in cognitive psychology",
      "Studies suggest that recognizing thinking patterns can be the first step in changing them",
      "Cognitive psychology research examines the relationship between thoughts and feelings",
    ],
    safeFraming: [
      "cognitive psychology explores",
      "CBT principles suggest",
      "research in cognitive science",
      "psychological theory proposes",
      "cognitive behavioral approaches examine",
    ],
  },

  rumination: {
    topic: "Rumination Theory",
    keyPoints: [
      "Rumination in psychology refers to repetitive thinking about problems or concerns",
      "Research distinguishes between productive reflection and repetitive rumination",
      "Studies explore how rumination patterns differ from problem-solving thinking",
      "The concept of mental loops has been studied in relation to emotional regulation",
      "Research suggests that rumination tends to focus on problems without moving toward solutions",
    ],
    safeFraming: [
      "psychological research defines",
      "studies on rumination suggest",
      "research explores",
      "the concept in psychology",
      "mental health research examines",
    ],
  },

  sleepCognitiveArousal: {
    topic: "Sleep and Cognitive Arousal",
    keyPoints: [
      "Research on sleep explores the relationship between mental activity and rest",
      "Studies suggest that cognitive arousal can interfere with the transition to sleep",
      "Sleep research examines how thoughts and worries interact with sleep onset",
      "The concept of pre-sleep cognitive activity has been studied in sleep science",
      "Research indicates that mental quiet may be as important as physical relaxation for sleep",
    ],
    safeFraming: [
      "sleep research suggests",
      "studies on sleep patterns",
      "research in sleep science",
      "sleep psychology explores",
      "studies indicate",
    ],
  },

  emotionalRegulation: {
    topic: "Emotional Regulation",
    keyPoints: [
      "Emotional regulation refers to how people manage and respond to their emotions",
      "Research explores various strategies people use to process emotional experiences",
      "Studies suggest that different regulation strategies work better in different situations",
      "The concept of emotion regulation is central to understanding mental well-being",
      "Research examines how people develop healthier relationships with their emotions",
    ],
    safeFraming: [
      "emotion research suggests",
      "studies on emotional processing",
      "psychological research explores",
      "research indicates",
      "studies in emotion science",
    ],
  },

  cognitiveBroadening: {
    topic: "Perspective and Cognitive Broadening",
    keyPoints: [
      "Research explores how perspective-taking can shift thought patterns",
      "Studies suggest that stepping back from thoughts can reduce their intensity",
      "The concept of cognitive distance has been examined in psychology research",
      "Research on mental flexibility explores how changing viewpoints affects thinking",
      "Studies indicate that observing thoughts without engaging may reduce rumination",
    ],
    safeFraming: [
      "research on perspective suggests",
      "studies explore",
      "psychological concepts describe",
      "research indicates",
      "cognitive science examines",
    ],
  },
};

/**
 * Get a random reference from a specific category
 * @param {string} category - Category key from referenceLibrary
 * @returns {Object|null} Random reference with keyPoint and framing
 */
export function getRandomReference(category) {
  const ref = referenceLibrary[category];

  if (!ref) {
    console.error(`Reference category "${category}" not found`);
    return null;
  }

  const randomKeyPoint =
    ref.keyPoints[Math.floor(Math.random() * ref.keyPoints.length)];

  const randomFraming =
    ref.safeFraming[Math.floor(Math.random() * ref.safeFraming.length)];

  return {
    topic: ref.topic,
    keyPoint: randomKeyPoint,
    framing: randomFraming,
    category,
  };
}

/**
 * Get multiple random references from different categories
 * @param {number} count - Number of references to get
 * @returns {Array} Array of reference objects
 */
export function getRandomReferences(count = 2) {
  const categories = Object.keys(referenceLibrary);
  const shuffled = categories.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, categories.length));

  return selected.map((category) => getRandomReference(category));
}

/**
 * Get all references from a specific category
 * @param {string} category - Category key
 * @returns {Object|null} Full category object
 */
export function getCategoryReferences(category) {
  return referenceLibrary[category] || null;
}

/**
 * Get all available reference categories
 * @returns {Array} Array of category keys
 */
export function getAllCategories() {
  return Object.keys(referenceLibrary);
}

/**
 * Format a reference for inclusion in article content
 * @param {string} category - Category key
 * @param {string} statement - The statement to frame with a reference
 * @returns {string} Formatted reference statement
 */
export function formatReference(category, statement) {
  const ref = getRandomReference(category);

  if (!ref) return statement;

  // Return statement with appropriate framing
  return `${ref.framing.charAt(0).toUpperCase() + ref.framing.slice(1)} that ${statement.charAt(0).toLowerCase() + statement.slice(1)}`;
}

/**
 * Validate that content doesn't contain banned medical phrases
 * Returns references that are safe to use
 * @param {string} content - Content to validate
 * @param {Array} selectedReferences - References to validate
 * @returns {Object} Validation result
 */
export function validateReferences(content, selectedReferences) {
  const bannedPhrases = [
    "diagnose",
    "disorder",
    "treatment",
    "cure",
    "clinical",
    "guarantee",
    "proven",
    "medical",
    "therapy",
    "condition",
  ];

  const issues = [];
  const contentLower = content.toLowerCase();

  selectedReferences.forEach((ref, index) => {
    const refContent = `${ref.keyPoint} ${ref.framing}`.toLowerCase();

    bannedPhrases.forEach((phrase) => {
      if (refContent.includes(phrase)) {
        issues.push({
          referenceIndex: index,
          phrase,
          reference: ref,
        });
      }
    });
  });

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Get contextual reference suggestions based on article topic
 * @param {string} topic - Article topic or keyword
 * @returns {Array} Array of relevant reference categories
 */
export function getSuggestedCategories(topic) {
  const topicLower = topic.toLowerCase();
  const suggestions = [];

  if (topicLower.includes("night") || topicLower.includes("sleep")) {
    suggestions.push("sleepCognitiveArousal");
  }

  if (topicLower.includes("thoughts") || topicLower.includes("racing")) {
    suggestions.push("rumination", "cognitiveRestructuring");
  }

  if (topicLower.includes("write") || topicLower.includes("journal")) {
    suggestions.push("expressiveWriting");
  }

  if (topicLower.includes("emotion") || topicLower.includes("feel")) {
    suggestions.push("emotionalRegulation");
  }

  if (topicLower.includes("perspective") || topicLower.includes("distance")) {
    suggestions.push("cognitiveBroadening");
  }

  // If no specific matches, return random categories
  if (suggestions.length === 0) {
    const allCategories = getAllCategories();
    return allCategories.slice(0, 2);
  }

  return suggestions;
}
