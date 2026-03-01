You are a senior full-stack engineer and product-focused UX designer.

Build a production-ready feature inside an existing Next.js 15.5 project (Pages Router, JavaScript, Tailwind + DaisyUI).

Feature name:
"The 2AM Overthinking Decoder"

Route:
pages/overthinking-decoder.js

This is a free, emotionally safe tool for people who experience racing thoughts at night.

====================================================
TECH STACK
====================================================

- Next.js 15.5 (Pages Router)
- JavaScript (not TypeScript)
- Tailwind CSS
- DaisyUI
- No external AI APIs
- No database
- No server storage
- Purely client-side classification
- SEO-friendly
- Fast (Lighthouse 90+)

====================================================
BRAND & TONE
====================================================

- Minimal
- Calm
- Emotionally safe
- Non-clinical
- No medical claims
- No diagnosis language
- No statistics
- No hustle or productivity tone
- Warm but restrained

====================================================
GOAL
====================================================

- Create a linkable SEO asset
- Emotional resonance
- Encourage app downloads
- Integrate with Night Overthinking blog cluster
- Support conversion to Pippin app

====================================================
TOOL LOGIC (RULE-BASED)
====================================================

Create a classification utility:
utils/decoder.js

It must classify user input into ONE of 5 categories using keyword scoring:

1. Future Control Anxiety
2. Social Rejection Protection
3. Regret Rumination
4. Perfection Loop
5. Unfinished Loop

Each category must include:

- title
- short explanation (why this happens at night)
- emotional need behind it
- gentle reframe
- 60-second release ritual (3 steps max)
- one reflection question

Classification method:

- Each category has a weighted keyword list
- Score based on keyword presence
- Return highest score
- If no match → default to "Future Control Anxiety"

No AI. No randomness.

====================================================
SAFETY GUARDRAILS
====================================================

Before classification:

If user input contains:

- self-harm language
- suicidal language
- phrases like "hurt myself", "end it", "kill myself"

DO NOT classify.

Instead show:

Soft message:

"If your thoughts feel overwhelming or unsafe, you deserve real support."

Followed by:

"Please consider reaching out to trusted support in your area."

No hotline numbers.
No diagnosis.
No dramatic tone.

====================================================
PAGE STRUCTURE
====================================================

Hero Section:

H1:
"What Is Your 2AM Thought Really Trying To Protect?"

Subtext:
"Paste the thought that won’t let you sleep."

Textarea:

- 500 character limit
- Character counter
- Soft example placeholder
- Accessible label

CTA button:
"Decode My Thought"

Use DaisyUI styling but keep minimal aesthetic.

====================================================
RESULT SECTION
====================================================

After submission:

- Smooth scroll to result
- Animated fade-in (respect prefers-reduced-motion)
- Clean card layout (DaisyUI card)

Display:

Category title (large)
Explanation
Emotional need
Gentle reframe
3-step release ritual
Reflection question

Below that:

Soft conversion block:

Headline:
"Want to release this thought for 24 hours?"

Body:
"You can lock it away inside Pippin so it doesn’t follow you into tomorrow."

Button:
"Try Pippin Free"

Link to:
https://yourpippindomain.com (placeholder)

====================================================
SHARE MECHANICS
====================================================

Add:

- "Copy Result" button (copies short summary)
- "Share as Image" feature

Share image should include:

- Category title
- One-line explanation
- "Decoded by Pippin"

Keep design minimal and elegant.
Use dynamic import for html-to-image to avoid heavy initial bundle.

====================================================
SEO STRUCTURE
====================================================

Add:

<Head> metadata:

Title:
"What Is Your 2AM Thought? | Free Overthinking Decoder"

Meta description:
"Can’t sleep because of racing thoughts? Paste your 2AM thought and understand what your mind may be trying to protect."

Structured content below tool:

H2:
"Why Overthinking Feels Worse at Night"

Short explanation paragraph.

FAQ Section (3 questions):

1. Why do thoughts feel louder at night?
2. Is overthinking at night normal?
3. How do I calm racing thoughts before sleep?

Add JSON-LD FAQ schema.

====================================================
INTERNAL LINKING
====================================================

Add "Related Reading" section:

Display 3 mock blog posts from Night Overthinking cluster:

- Why You Overthink More at Night
- Racing Thoughts Before Bed
- How to Stop Replaying Conversations at 2AM

Use simple link cards.

====================================================
ACCESSIBILITY
====================================================

- Proper labels
- Keyboard navigable
- No flashing animations
- Respect prefers-reduced-motion
- Adequate color contrast

====================================================
CODE OUTPUT REQUIREMENTS
====================================================

Return:

1. Full code for pages/overthinking-decoder.js
2. utils/decoder.js
3. Share image helper
4. Example DaisyUI/Tailwind structure
5. Keyword arrays for all categories

Do not explain.
Output clean, production-ready JavaScript code only.
