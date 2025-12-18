export const faqData = [
  {
    question: "What exactly is Pippin?",
    answer:
      'Pippin is a "digital gardening" journal designed to help you stop overthinking. Instead of letting stressful thoughts loop in your head, you write them down ("plant them") in the app. Over time, these thoughts transform into unique 3D clay flowers, creating a beautiful visual archive of your emotional growth.',
  },
  {
    question: "How does the gardening process work?",
    answer: (
      <div className="space-y-2">
        <div>
          <strong>Plant:</strong> You write down a worry or thought.
        </div>
        <div>
          <strong>Wait:</strong> The seed needs time to process. Usually, it
          takes 24 hours to bloom (representing the time needed to &quot;let
          go&quot;).
        </div>
        <div>
          <strong>Bloom:</strong> You return to find a unique flower based on
          the sentiment of your thought, along with a comforting letter from
          Pippin.
        </div>
      </div>
    ),
  },
  {
    question: "Who writes the letters?",
    answer:
      "The letters are written by Pippin, our AI gardening companion. We use advanced, secure AI technology to analyze the sentiment of your entry and generate a gentle, metaphorical response to help you reframe your perspective. Pippin is designed to be a supportive friend, not a doctor.",
  },
  {
    question: "Is my journal private?",
    answer:
      "Absolutely. Your thoughts are encrypted and stored securely in the cloud so only you can access them. We do not sell your personal journal entries to advertisers, and our AI integration is configured so that your data is not used to train public AI models.",
  },
  {
    question: "Why do I need to create an account?",
    answer:
      "We require an account (via Apple or Google Sign-In) to ensure your garden is safe. Since growing a garden takes time, we want to make sure you never lose your progress, even if you lose your phone or switch devices.",
  },
  {
    question: "Is Pippin a replacement for therapy?",
    answer:
      "No. Pippin is a self-care tool for reflection and stress relief. While it can be a helpful companion, it is not a medical device and does not replace professional mental health care. If you are in crisis, please contact a professional or emergency services.",
  },
  {
    question: "What is included in Pippin Pro?",
    answer: (
      <div className="space-y-2">
        <div>Pippin Pro unlocks the full gardening experience:</div>
        <div>
          <strong>Fertilizer (Speed Up Time):</strong> Skip the 24-hour wait and
          make your seeds bloom in just 1 hour.
        </div>
        <div>
          <strong>Full History Access:</strong> Look back at your entire
          garden&apos;s history and re-read old letters.
        </div>
        <div>
          <strong>Unlimited Planting:</strong> Plant as many thoughts as you
          need without restrictions.
        </div>
        <div>
          <strong>Face ID & Privacy Screen:</strong> Protect your garden with
          biometric app lock (Face ID/Touch ID) and privacy screen to keep your
          thoughts hidden in the app switcher.
        </div>
        <div>
          <strong>Support Development:</strong> You help a small indie team keep
          Pippin growing!
        </div>
      </div>
    ),
  },
  {
    question: "How much does it cost?",
    answer: (
      <div className="space-y-2">
        <div>We offer two simple plans:</div>
        <div>
          <strong>Monthly:</strong> $4.99 / month
        </div>
        <div>
          <strong>Yearly:</strong> $29.99 / year (Best Value)
        </div>
        <div>
          <strong>Lifetime:</strong> $69.99
        </div>
        <div className="text-sm">
          Prices are in USD and may vary slightly by region.
        </div>
      </div>
    ),
  },
  {
    question: "How does the Free Trial work?",
    answer:
      "The Yearly Plan comes with a 7-Day Free Trial. You can use all Pro features for free for one week. If you enjoy it, you don't need to do anything—it will automatically convert to a yearly subscription. If it's not for you, just cancel at least 24 hours before the trial ends, and you won't be charged.",
  },
  {
    question: "How do I cancel or request a refund?",
    answer: (
      <div className="space-y-2">
        <div>
          Since Pippin is an iOS app, all billing is managed securely by Apple.
        </div>
        <div>
          <strong>To Cancel:</strong> Go to your iPhone Settings → Tap your Name
          → Subscriptions → Pippin → Cancel Subscription.
        </div>
        <div>
          <strong>For Refunds:</strong> You must request a refund directly
          through{" "}
          <a
            href="https://reportaproblem.apple.com/"
            className="font-semibold text-green-600 underline underline-offset-2"
          >
            Apple
          </a>
          , as developers do not have access to your billing information.
        </div>
      </div>
    ),
  },
];
