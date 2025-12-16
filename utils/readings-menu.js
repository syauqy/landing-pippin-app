export const CardData = {
  general: [
    {
      id: 1,
      title: "Your Weton",
      description:
        "Explore the foundational energies of your Javanese birth day combination.",
      slug: "weton",
      category: "general_readings",
      type: "free",
    },
    {
      id: 2,
      title: "Your Wuku",
      description:
        "Uncover the specific influences of your birth week in the Pawukon cycle.",
      slug: "wuku",
      category: "general_readings",
      type: "free",
    },
    {
      id: 3,
      title: "Primary Traits",
      description:
        "Identify your most prominent strengths and inherent characteristics.",
      slug: "primary-traits",
      category: "general_readings",
      type: "free",
    },
    {
      id: 4,
      title: "Rakam",
      description:
        "Uncover the significant life themes or karmic imprints shaping your experiences.",
      slug: "rakam",
      category: "general_readings",
      type: "pro",
    },
    // {
    //   id: 5,
    //   title: "Sadwara",
    //   description:
    //     "Explore the subtle behavioral tendencies influenced by the six-day Pawukon cycle.",
    //   slug: "sadwara",
    //   category: "general_readings",
    //   type: "pro",
    // },
    {
      id: 6,
      title: "Pancasuda",
      description:
        "Reveal the core pillar of your inner foundation and its potential influenced by the seven-day Pawukon cycle.",
      slug: "pancasuda",
      category: "general_readings",
      type: "pro",
    },
    // {
    //   id: 7,
    //   title: "Hastawara",
    //   description:
    //     "Understand the specific fortunes and challenges guided by the eight-day cycle influence.",
    //   slug: "hastawara",
    //   category: "general_readings",
    //   type: "pro",
    // },
    {
      id: 8,
      title: "Laku",
      description:
        "Discover the archetype and behavioral pattern that guides your life's journey.",
      slug: "laku",
      category: "general_readings",
      type: "pro",
    },
    {
      id: 9,
      title: "Values",
      description:
        "Pinpoint the core principles that drive your decisions and motivations.",
      slug: "values",
      category: "general_readings",
      type: "pro",
    },
    {
      id: 10,
      title: "Interaction Style",
      description:
        "Learn how you naturally connect and communicate with the world around you.",
      slug: "interaction-style",
      category: "general_readings",
      type: "pro",
    },
    // {
    //   id: 11,
    //   title: "Life Path",
    //   description:
    //     "Get insights into the themes and directions of your life's journey.",
    //   slug: "life-path",
    //   category: "general_readings",
    //   type: "pro",
    // },
  ],
  love: [
    {
      id: 10,
      title: "Your Love",
      description:
        "Explore the core of how your Weton shapes your approach to love and partnership.",
      slug: "love-core",
      category: "love_readings",
      type: "free",
    },
    {
      id: 11,
      title: "Love Style",
      description:
        "Discover your natural way of expressing and receiving affection in relationships.",
      slug: "love-style",
      category: "love_readings",
      type: "free",
    },
    {
      id: 12,
      title: "Love Attitudes",
      description:
        "Uncover your underlying beliefs and perspectives when it comes to romance.",
      slug: "love-attitudes",
      category: "love_readings",
      type: "free",
    },

    {
      id: 14,
      title: "What You Offer",
      description:
        "Identify the unique strengths and gifts you bring to a loving relationship.",
      slug: "your-offer",
      category: "love_readings",
      type: "pro",
    },
    {
      id: 15,
      title: "Compatible With",
      description:
        "Learn about Weton energies that naturally harmonize with your own in love.",
      slug: "love-compatibility",
      category: "love_readings",
      type: "pro",
    },
    {
      id: 16,
      title: "Incompatible With",
      description:
        "Understand potential energetic clashes and challenges with other Wetons in relationships.",
      slug: "love-incompatibility",
      category: "love_readings",
      type: "pro",
    },
    {
      id: 13,
      title: "Attachement Style",
      description:
        "Gain insight into how you form bonds and connect emotionally with partners.",
      slug: "attachment-style",
      category: "love_readings",
      type: "pro",
    },
  ],
  work: [
    {
      id: 17,
      title: "Your Career",
      description:
        "Explore professions and work styles that resonate with your Weton's energy.",
      slug: "your-career",
      category: "work_readings",
      type: "pro",
    },
    {
      id: 18,
      title: "Ideal Life",
      description:
        "Envision the life that truly fulfills your potential and deepest aspirations.",
      slug: "ideal-life",
      category: "work_readings",
      type: "pro",
    },
    // {
    //   id: 19,
    //   title: "Key Life Themes",
    //   description:
    //     "Identify potential pivotal moments and themes that may shape your journey.",
    //   slug: "key-life",
    //   category: "work_readings",
    //   type: "pro",
    // },
  ],
  financial: [
    {
      id: 20,
      title: "Your Financial",
      description:
        "Understand your natural approach to wealth, and financial opportunities.",
      slug: "your-financial",
      category: "financial_readings",
      type: "pro",
    },
    {
      id: 21,
      title: "Conscious Coin",
      description:
        "Understand your spending style that reflects your values and priorities.",
      slug: "concious-coin",
      category: "financial_readings",
      type: "pro",
    },
    // {
    //   id: 21,
    //   title: "Financial Cycles",
    //   description:
    //     "Understand insights into the cyclical nature of your financial fortunes.",
    //   slug: "financial-cycles",
    //   category: "financial_readings",
    //   type: "pro",
    // },
    // {
    //   id: 22,
    //   title: "Wealth Through Purpose",
    //   description:
    //     "Explores how your Weton impacting financial prosperity and personal fulfillment.",
    //   slug: "wealth-purpose",
    //   category: "financial_readings",
    //   type: "pro",
    // },
  ],
};

export const SectionData = [
  {
    title: "🔮 Personal Readings",
    subtitle:
      "Unlock the core of your being and discover the unique energies that shape you.",
    cards: CardData.general,
    tag: "personal",
  },
  {
    title: "💖 Love and Relationship",
    subtitle:
      "Navigate the world of love by understanding your unique romantic tendencies and connection styles.",
    cards: CardData.love,
    tag: "love",
  },
  {
    title: "💼 Work, Career, and Purpose",
    subtitle:
      "Align your professional path with your innate talents and discover your true calling.",
    cards: CardData.work,
    tag: "work",
  },
  {
    title: "💰 Financial Fortune",
    subtitle:
      "Gain insights into your financial tendencies to better manage and grow your resources.",
    cards: CardData.financial,
    tag: "financial",
  },
];
