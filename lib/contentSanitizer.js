/**
 * Content Safety and Sanitizer
 *
 * This module ensures all generated content adheres to safety guidelines:
 * - No medical claims or diagnoses
 * - No fake statistics or studies
 * - No guarantees or definitive outcomes
 * - Appropriate disclaimers
 * - Calm, educational tone
 */

/**
 * Banned phrases that should never appear in content
 */
export const bannedPhrases = [
  // Medical/Clinical Terms - strict context-specific checks
  "diagnose",
  "diagnosis",
  "disorder",
  "treatment plan",
  "treat your",
  // Removed "cure" and "clinical" - can appear in educational context
  // (e.g., "clinical research shows", "looking for a cure")
  "clinically proven",
  "medical condition",
  "mental illness",
  // Removed "therapeutic" - can appear legitimately
  "therapy for ",
  "prescription",
  "medication",

  // Guarantees and Absolutes
  "guaranteed",
  "guarantee",
  "will definitely",
  "proven to cure",
  "always works",
  "100% effective",
  "never fails",
  "scientifically proven to",

  // Fake Authority
  "studies show that",
  "research proves",
  "scientists discovered",
  "doctors recommend",
  "experts agree",
  "according to Harvard",
  "Stanford study found",

  // Overpromises
  "fix your",
  "eliminate your",
  "get rid of",
  "completely stop",
  "permanent solution",
  "instant relief",

  // Inappropriate Framing
  "you have",
  "you suffer from",
  "you are diagnosed",
  "your condition",
  "your disorder",
];

/**
 * Warning phrases that should be replaced with softer alternatives
 */
export const warningPhrases = {
  "you need to": "you might consider",
  "you must": "you could",
  "you should": "you might",
  "this will": "this may",
  "this causes": "this can contribute to",
  prevents: "may help reduce",
  fixes: "may help with",
  solves: "may address",
  eliminates: "may reduce",
  stops: "may help quiet",
};

/**
 * Commonly overused words to check for repetition
 * NOTE: Removed "mind" and "thoughts" - these are central to overthinking content
 * and naturally appear frequently. Checking their frequency is counterproductive.
 */
export const overusedWords = [
  "overthinking",
  "racing thoughts", // Kept as phrase only, not individual words
  "brain",
  "mental",
  "anxiety", // Should be used sparingly
];

/**
 * Check if content contains any banned phrases
 * @param {string} content - Content to check
 * @returns {Object} Validation result with found issues
 */
export function checkBannedPhrases(content) {
  const contentLower = content.toLowerCase();
  const found = [];

  bannedPhrases.forEach((phrase) => {
    if (contentLower.includes(phrase.toLowerCase())) {
      // Find all occurrences
      const regex = new RegExp(phrase, "gi");
      const matches = content.match(regex);

      if (matches) {
        found.push({
          phrase,
          count: matches.length,
          matches,
        });
      }
    }
  });

  return {
    isClean: found.length === 0,
    issues: found,
  };
}

/**
 * Replace warning phrases with safer alternatives
 * @param {string} content - Content to sanitize
 * @returns {string} Sanitized content
 */
export function replaceWarningPhrases(content) {
  let sanitized = content;

  Object.entries(warningPhrases).forEach(([warning, replacement]) => {
    const regex = new RegExp(warning, "gi");
    sanitized = sanitized.replace(regex, replacement);
  });

  return sanitized;
}

/**
 * Check for overuse of specific words
 * @param {string} content - Content to check
 * @param {number} threshold - Maximum allowed occurrences (default: 15)
 * @returns {Object} Analysis of word usage
 */
export function checkOverusedWords(content, threshold = 15) {
  const contentLower = content.toLowerCase();
  const wordCount = content.split(/\s+/).length;
  const overused = [];

  overusedWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;

    // Calculate frequency per 1000 words
    const frequency = (count / wordCount) * 1000;

    if (count > threshold || frequency > 20) {
      overused.push({
        word,
        count,
        frequency: frequency.toFixed(2),
        severity: frequency > 30 ? "high" : "moderate",
      });
    }
  });

  return {
    isAcceptable: overused.length === 0,
    overused,
    totalWords: wordCount,
  };
}

/**
 * Validate that content doesn't contain generic AI fluff phrases
 * @param {string} content - Content to check
 * @returns {Object} Validation result
 */
export function checkGenericFluff(content) {
  const fluffPhrases = [
    "in today's fast-paced world",
    "it's no secret that",
    "in this modern age",
    "as we all know",
    "needless to say",
    "it goes without saying",
    "in conclusion",
    "to sum up",
    "in summary",
    "at the end of the day",
    "the fact of the matter is",
    "when all is said and done",
    "let's dive in",
    "let's explore",
    "let's take a closer look",
  ];

  const contentLower = content.toLowerCase();
  const found = [];

  fluffPhrases.forEach((phrase) => {
    if (contentLower.includes(phrase.toLowerCase())) {
      found.push(phrase);
    }
  });

  return {
    isClean: found.length === 0,
    fluffPhrases: found,
  };
}

/**
 * Comprehensive content sanitization
 * @param {string} content - Content to sanitize
 * @returns {Object} Sanitized content and validation report
 */
export function sanitizeContent(content) {
  // Step 1: Check for banned phrases
  const bannedCheck = checkBannedPhrases(content);

  // Step 2: Replace warning phrases
  let sanitized = replaceWarningPhrases(content);

  // Step 3: Check for overused words
  const overuseCheck = checkOverusedWords(sanitized);

  // Step 4: Check for generic fluff
  const fluffCheck = checkGenericFluff(sanitized);

  const issues = [];

  if (!bannedCheck.isClean) {
    issues.push({
      type: "banned_phrases",
      severity: "critical",
      details: bannedCheck.issues,
    });
  }

  if (!overuseCheck.isAcceptable) {
    issues.push({
      type: "overused_words",
      severity: "warning",
      details: overuseCheck.overused,
    });
  }

  if (!fluffCheck.isClean) {
    issues.push({
      type: "generic_fluff",
      severity: "minor",
      details: fluffCheck.fluffPhrases,
    });
  }

  return {
    content: sanitized,
    isValid: bannedCheck.isClean, // Only critical issues invalidate
    issues,
    stats: {
      totalWords: overuseCheck.totalWords,
      bannedPhrasesFound: bannedCheck.issues.length,
      overusedWords: overuseCheck.overused.length,
      fluffPhrasesFound: fluffCheck.fluffPhrases.length,
    },
  };
}

/**
 * Generate educational disclaimer footer
 * @returns {string} Disclaimer text in markdown
 */
export function generateDisclaimer() {
  return `
---

**Educational Resource**  
This article is for educational purposes and reflects common experiences with overthinking. It is not medical advice or mental health treatment. If you're experiencing persistent distress, consider speaking with a qualified mental health professional.
`;
}

/**
 * Generate subtle Pippin product bridge
 * @returns {string} Product bridge text in markdown
 */
export function generateProductBridge() {
  return `
---

**A Simple Tool for Releasing Thoughts**  
If you find yourself caught in mental loops, Pippin offers a minimal way to externalize your thoughts. Write them down, lock them away, and let your mind rest. Learn more at [getpippin.app](https://getpippin.app).
`;
}

/**
 * Check if title/headline is appropriate (not too sensational)
 * @param {string} title - Title to check
 * @returns {Object} Validation result
 */
export function validateTitle(title) {
  const sensationalPhrases = [
    "shocking",
    "unbelievable",
    "secret",
    "amazing",
    "incredible",
    "life-changing",
    "miracle",
    "hack",
    "trick",
    "revolutionary",
    "breakthrough",
  ];

  const titleLower = title.toLowerCase();
  const found = sensationalPhrases.filter((phrase) =>
    titleLower.includes(phrase),
  );

  return {
    isAppropriate: found.length === 0,
    sensationalWords: found,
  };
}

/**
 * Extract and validate meta description
 * @param {string} description - Meta description
 * @returns {Object} Validation result
 */
export function validateMetaDescription(description) {
  const issues = [];

  if (description.length < 120) {
    issues.push("Too short (should be 120-160 characters)");
  }

  if (description.length > 160) {
    issues.push("Too long (should be 120-160 characters)");
  }

  const bannedCheck = checkBannedPhrases(description);
  if (!bannedCheck.isClean) {
    issues.push("Contains banned phrases");
  }

  return {
    isValid: issues.length === 0,
    issues,
    length: description.length,
  };
}
