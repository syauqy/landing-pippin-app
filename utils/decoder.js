// Safety keywords that trigger the safety message
const SAFETY_KEYWORDS = [
  "kill myself",
  "end it all",
  "hurt myself",
  "suicide",
  "want to die",
  "end my life",
  "no point living",
  "better off dead",
  "harm myself",
  "take my life",
];

// Category definitions with keywords and weights
const CATEGORIES = {
  futureControlAnxiety: {
    title: "Future Control Anxiety",
    keywords: {
      high: [
        "what if",
        "worry",
        "prepare",
        "plan",
        "ready",
        "prepared",
        "control",
        "prevent",
        "avoid",
        "protect",
        "happen",
        "goes wrong",
        "mess up",
        "fail",
        "scared",
        "afraid",
        "anxious",
        "nervous",
        "uncertain",
        "unprepared",
      ],
      medium: [
        "tomorrow",
        "next week",
        "future",
        "coming",
        "upcoming",
        "soon",
        "later",
        "eventually",
        "might",
        "could",
        "maybe",
        "possibly",
        "chance",
        "risk",
        "danger",
      ],
    },
    explanation:
      "Your mind is trying to prepare you for uncertainty by running through scenarios. At night, without distractions, this planning mode can spiral into worry loops.",
    emotionalNeed:
      "You need to feel prepared and safe in the face of an uncertain future.",
    reframe:
      "Not all preparation happens through worry. Some things can only be handled when they actually arrive.",
    ritual: [
      "Write down the one thing you can actually control about tomorrow",
      'Say out loud: "I can handle what comes, one step at a time"',
      "Place your hand on your chest and take three slow breaths",
    ],
    reflectionQuestion:
      "What would tomorrow look like if you trusted yourself to handle it?",
  },
  socialRejectionProtection: {
    title: "Social Rejection Protection",
    keywords: {
      high: [
        "said",
        "told",
        "conversation",
        "talk",
        "awkward",
        "embarrassing",
        "stupid",
        "dumb",
        "silly",
        "weird",
        "think of me",
        "judge",
        "judging",
        "hate me",
        "mad at me",
        "upset",
        "offended",
        "angry",
        "annoyed",
        "bothered",
      ],
      medium: [
        "they",
        "them",
        "people",
        "everyone",
        "someone",
        "friend",
        "coworker",
        "boss",
        "family",
        "should have",
        "could have",
        "why did I",
        "replay",
        "again",
        "over",
        "keep thinking",
      ],
    },
    explanation:
      "Your mind is scanning for social threats—trying to identify anything that might have damaged your relationships or reputation.",
    emotionalNeed:
      "You need to feel accepted, understood, and safe in your social connections.",
    reframe:
      "Most people are too focused on their own worries to judge yours. And the ones who matter will give you grace.",
    ritual: [
      "Think of one person who sees you clearly and still chooses you",
      'Say: "I am allowed to be imperfect in conversations"',
      "Imagine releasing the conversation like a balloon floating away",
    ],
    reflectionQuestion:
      "If your closest friend had this same interaction, would you judge them?",
  },
  regretRumination: {
    title: "Regret Rumination",
    keywords: {
      high: [
        "regret",
        "mistake",
        "should have",
        "shouldn't have",
        "wish I",
        "if only",
        "why did I",
        "ruined",
        "messed up",
        "wrong choice",
        "bad decision",
        "screwed up",
        "fault",
        "blame",
        "my fault",
        "responsible",
      ],
      medium: [
        "past",
        "ago",
        "back then",
        "used to",
        "before",
        "years ago",
        "months ago",
        "last",
        "earlier",
        "didn't",
        "could have",
        "would have",
        "different",
        "change",
        "undo",
      ],
    },
    explanation:
      'Your brain is trying to "solve" the past by running through alternative versions. It feels productive, but the past cannot be rewritten.',
    emotionalNeed:
      "You need to feel forgiven by yourself or by the situation, and to trust that you did the best you could with what you knew.",
    reframe:
      "Regret shows you care. But you can honor what you learned without punishing yourself for not knowing sooner.",
    ritual: [
      'Finish this sentence: "I forgive myself for..."',
      "Write down one thing that experience taught you",
      "Close your eyes and imagine your past self receiving a hug",
    ],
    reflectionQuestion:
      "What would you say to a younger version of yourself going through this?",
  },
  perfectionLoop: {
    title: "Perfection Loop",
    keywords: {
      high: [
        "not good enough",
        "perfect",
        "better",
        "improve",
        "more",
        "optimize",
        "efficient",
        "productivity",
        "should be",
        "supposed to",
        "expected",
        "standards",
        "high standards",
        "disappointing",
        "let down",
        "not enough",
        "lacking",
      ],
      medium: [
        "work",
        "project",
        "task",
        "goal",
        "achievement",
        "success",
        "performance",
        "compare",
        "comparison",
        "others",
        "them",
        "better than",
        "worse than",
        "behind",
        "ahead",
      ],
    },
    explanation:
      "Your mind is measuring your worth by output and achievement. At night, when you are not producing, it can feel like you are falling behind.",
    emotionalNeed:
      "You need to feel valuable not because of what you do, but because of who you are.",
    reframe:
      "Rest is not a reward you earn. It is a biological need. You are enough right now, exactly as you are.",
    ritual: [
      "Name one thing you did today that no one will applaud",
      'Say out loud: "I am not my productivity"',
      'Rest your hand on your heart and breathe: "I am enough"',
    ],
    reflectionQuestion:
      "What would it feel like to let yourself be average at something?",
  },
  unfinishedLoop: {
    title: "Unfinished Loop",
    keywords: {
      high: [
        "didn't finish",
        "incomplete",
        "unfinished",
        "forgot",
        "remember",
        "need to",
        "have to",
        "must",
        "supposed to",
        "deadline",
        "due",
        "pending",
        "waiting",
        "left undone",
        "to-do",
        "tasks",
      ],
      medium: [
        "tomorrow",
        "later",
        "still",
        "yet",
        "eventually",
        "soon",
        "email",
        "message",
        "respond",
        "reply",
        "call",
        "text",
        "send",
        "finish",
        "complete",
      ],
    },
    explanation:
      "Your mind is holding open tabs, keeping mental track of things you have not closed yet. It is trying to make sure nothing falls through the cracks.",
    emotionalNeed:
      "You need to feel complete, in control of your responsibilities, and confident that nothing important is being forgotten.",
    reframe:
      "Not everything unfinished is urgent. Some things can wait. You are allowed to close the tabs for tonight.",
    ritual: [
      "Write down the one thing that feels most unfinished",
      'Tell it: "I will handle you tomorrow, but not tonight"',
      "Close your eyes and imagine closing a laptop with everything saved",
    ],
    reflectionQuestion:
      "If this task did not exist, what would you be thinking about instead?",
  },
};

/**
 * Check if the input contains safety-concerning language
 * @param {string} input - User's thought input
 * @returns {boolean}
 */
export function containsSafetyKeywords(input) {
  const lowerInput = input.toLowerCase();
  return SAFETY_KEYWORDS.some((keyword) => lowerInput.includes(keyword));
}

/**
 * Calculate score for a category based on keyword presence
 * @param {string} input - User's thought input
 * @param {Object} keywords - Category keywords object with high and medium arrays
 * @returns {number} - Score for this category
 */
function calculateCategoryScore(input, keywords) {
  const lowerInput = input.toLowerCase();
  let score = 0;

  // High-weight keywords: 3 points each
  keywords.high.forEach((keyword) => {
    if (lowerInput.includes(keyword)) {
      score += 3;
    }
  });

  // Medium-weight keywords: 1 point each
  keywords.medium.forEach((keyword) => {
    if (lowerInput.includes(keyword)) {
      score += 1;
    }
  });

  return score;
}

/**
 * Classify user input into one of the 5 categories
 * @param {string} input - User's thought input
 * @returns {Object} - Category data with all fields
 */
export function classifyThought(input) {
  // Safety check first
  if (containsSafetyKeywords(input)) {
    return {
      isSafetyConcern: true,
      category: null,
    };
  }

  // Calculate scores for each category
  const scores = {
    futureControlAnxiety: calculateCategoryScore(
      input,
      CATEGORIES.futureControlAnxiety.keywords,
    ),
    socialRejectionProtection: calculateCategoryScore(
      input,
      CATEGORIES.socialRejectionProtection.keywords,
    ),
    regretRumination: calculateCategoryScore(
      input,
      CATEGORIES.regretRumination.keywords,
    ),
    perfectionLoop: calculateCategoryScore(
      input,
      CATEGORIES.perfectionLoop.keywords,
    ),
    unfinishedLoop: calculateCategoryScore(
      input,
      CATEGORIES.unfinishedLoop.keywords,
    ),
  };

  // Find category with highest score
  let highestScore = 0;
  let selectedCategory = "futureControlAnxiety"; // Default

  Object.keys(scores).forEach((categoryKey) => {
    if (scores[categoryKey] > highestScore) {
      highestScore = scores[categoryKey];
      selectedCategory = categoryKey;
    }
  });

  // Return the category data (without keywords)
  const category = CATEGORIES[selectedCategory];
  return {
    isSafetyConcern: false,
    category: {
      title: category.title,
      explanation: category.explanation,
      emotionalNeed: category.emotionalNeed,
      reframe: category.reframe,
      ritual: category.ritual,
      reflectionQuestion: category.reflectionQuestion,
    },
  };
}

/**
 * Generate a short summary for sharing
 * @param {Object} categoryData - The classified category data
 * @returns {string} - Shareable text summary
 */
export function generateShareText(categoryData) {
  if (!categoryData || !categoryData.title) return "";

  return `My 2AM thought decoded: ${categoryData.title}\n\n${categoryData.explanation}\n\nDecoded by Pippin – getpippin.app`;
}
