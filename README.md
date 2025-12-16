<div align="center">
  <img src="public/logos/puppin.png" alt="Pippin Mascot Logo" width="120" />
  <h1>Overthinking Journal - Pippin</h1>
  <p>
    <strong>Pippin is a minimalist journal app for overthinkers. The simplest way to quiet your mind: write it down, lock it away, and let it go.</strong>
  </p>
  <p>
    <a href="#features-completed-">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#deployment--configuration">Deployment</a> •
    <a href="#roadmap">Roadmap</a>
  </p>
</div>

---

## Project Overview

**Codename:** Pippin  
**Status:** Production Ready - Post-Launch Phase  
**Last Updated:** December 16, 2025

Pippin is a minimalist journal app for overthinkers. Its core goal is to build the "Core Engine" of a mobile app with the value proposition: "The simplest way to quiet your mind. Write it down, lock it away, and let it go."

**Current Focus:** Core MVP complete with full monetization infrastructure. App Store ready with robust RevenueCat integration, Firestore webhook sync, and premium feature gating. Now focusing on optimization, AI-powered features (Pippin Letters), and post-launch enhancements.

---

## Tech Stack

| Layer              | Technology                                                 |
| ------------------ | ---------------------------------------------------------- |
| **Framework**      | Next.js 15.2.6 (Page Router, static export)                |
| **Mobile Wrapper** | Capacitor 7.4.0 (iOS 7.4.0, Android 7.2.0)                 |
| **Styling**        | Tailwind CSS 4.0.17 + DaisyUI 5.0.35                       |
| **Database**       | Firebase 11.10.0 (Firestore with offline persistence)      |
| **Authentication** | Firebase Auth (Anonymous + Email/Password)                 |
| **Monetization**   | RevenueCat v11.2.17 (Subscriptions + Webhooks)             |
| **Animations**     | Framer Motion 12.23.12                                     |
| **Notifications**  | Sonner 2.0.3 + @capacitor/local-notifications 7.0.3        |
| **Icons**          | Lucide React 0.509.0                                       |
| **Voice**          | @capacitor-community/speech-recognition 7.0.1              |
| **Local Storage**  | @capacitor/preferences 7.0.2                               |
| **Security**       | Biometric (@capgo/capacitor-native-biometric 7.5.4)        |
| **Privacy**        | Privacy Screen (@capacitor-community/privacy-screen 6.0.0) |
| **Analytics**      | PostHog (@capawesome/capacitor-posthog 7.2.0)              |

---

## Features Completed ✅

### Core Features

- ✅ Firebase Auth (Anonymous + Email/Password linking)
- ✅ Firestore data sync with offline persistence
- ✅ Dump creation with lock/unlock mechanics
- ✅ Lockbox (archive) with countdown timers
- ✅ Voice input (multi-language speech recognition)
- ✅ Local notifications (unlock reminders, daily reminders)
- ✅ Onboarding flow (6 screens with worry type selection)
- ✅ Multi-language support (20+ languages)

### Premium & Monetization

- ✅ RevenueCat integration (Monthly/Yearly/Lifetime subscriptions)
- ✅ Paywall modal (Select-then-buy pattern with luxury design)
- ✅ Firestore webhook sync (Real-time subscription status updates)
- ✅ Premium features gate (Boost, Letters, Greenhouse, App Lock, Privacy Screen)
- ✅ Subscription restoration (Apple/Google purchase recovery)
- ✅ Pro badge system (Visual indicators for premium users)

### UI/UX & Design

- ✅ ProfileCard component (Gamified stats: Blooms, Days Active, Letters)
- ✅ Luxury gold/amber theme (Modern Zen aesthetic)
- ✅ Bloom animations (Flower growth visualizations)
- ✅ Biometric app lock (Face ID/Touch ID)
- ✅ Privacy screen (Content protection in app switcher)
- ✅ Pull-to-refresh (Native mobile interactions)
- ✅ Responsive design (iOS, Android, Web)

### Settings & Configuration

- ✅ Language selection (20+ languages)
- ✅ Notification preferences
- ✅ Daily reminder scheduling
- ✅ Account management (logout, delete)
- ✅ Feedback system
- ✅ Legal pages (Terms, Privacy Policy)

### Developer Tools

- ✅ PostHog analytics (Event tracking)
- ✅ Performance optimization (Bundle size, lazy loading)
- ✅ Firestore security rules (Production-ready)
- ✅ Testing checklist (QA documentation)

## Features In Progress 🔄

- 🔄 AI-powered Pippin Letters (Cloud Functions integration)
- 🔄 Sentiment analysis (Automatic mood detection)
- 🔄 App Store optimization (Screenshots, descriptions)
- 🔄 Advanced analytics dashboard (Insights & trends)

## Features Planned 📋

- 📋 Encrypted cloud backup (Cross-device sync)
- 📋 Premium flower assets (3D clay-style designs)
- 📋 Insights dashboard (Historical patterns, mood trends)
- 📋 Social features (Anonymized sharing, community support)
- 📋 Integrations (Apple Health, Notion, calendar export)
- 📋 Theme customization (Additional color schemes)
- 📋 Export functionality (PDF, text format)
- 📋 Widget support (Quick dump from home screen)

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Deployment

You can deploy this landing page to Vercel, Netlify, or any platform that supports Next.js.

## Customization

- Update images, app store links, and feature descriptions in `pages/index.jsx` as needed.
- SEO and Open Graph settings are in the same file.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
