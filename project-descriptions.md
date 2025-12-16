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

- ✅ **RevenueCat integration** (Monthly/Yearly/Lifetime subscriptions)
- ✅ **Paywall modal** (Select-then-buy pattern with luxury design)
- ✅ **Firestore webhook sync** (Real-time subscription status updates)
- ✅ **Premium features gate** (Boost, Letters, Greenhouse, App Lock, Privacy Screen)
- ✅ **Subscription restoration** (Apple/Google purchase recovery)
- ✅ **Pro badge system** (Visual indicators for premium users)

### UI/UX & Design

- ✅ **ProfileCard component** (Gamified stats: Blooms, Days Active, Letters)
- ✅ **Luxury gold/amber theme** (Modern Zen aesthetic)
- ✅ **Bloom animations** (Flower growth visualizations)
- ✅ **Biometric app lock** (Face ID/Touch ID)
- ✅ **Privacy screen** (Content protection in app switcher)
- ✅ **Pull-to-refresh** (Native mobile interactions)
- ✅ **Responsive design** (iOS, Android, Web)

### Settings & Configuration

- ✅ Language selection (20+ languages)
- ✅ Notification preferences
- ✅ Daily reminder scheduling
- ✅ Account management (logout, delete)
- ✅ Feedback system
- ✅ Legal pages (Terms, Privacy Policy)

### Developer Tools

- ✅ **PostHog analytics** (Event tracking)
- ✅ **Performance optimization** (Bundle size, lazy loading)
- ✅ **Firestore security rules** (Production-ready)
- ✅ **Testing checklist** (QA documentation)

## Features In Progress 🔄

- 🔄 **AI-powered Pippin Letters** (Cloud Functions integration)
- 🔄 **Sentiment analysis** (Automatic mood detection)
- 🔄 **App Store optimization** (Screenshots, descriptions)
- 🔄 **Advanced analytics dashboard** (Insights & trends)

## Features Planned 📋

- 📋 **Encrypted cloud backup** (Cross-device sync)
- 📋 **Premium flower assets** (3D clay-style designs)
- 📋 **Insights dashboard** (Historical patterns, mood trends)
- 📋 **Social features** (Anonymized sharing, community support)
- 📋 **Integrations** (Apple Health, Notion, calendar export)
- 📋 **Theme customization** (Additional color schemes)
- 📋 **Export functionality** (PDF, text format)
- 📋 **Widget support** (Quick dump from home screen
- 📋 Integrations (Apple Health, Notion, etc.)

---

## 1. Project Setup

✅ **Completed**

- Next.js 15+ app (Page Router, static export)
- Capacitor.js 6+ initialized
- Firebase Firestore with offline persistence
- Tailwind CSS + DaisyUI
- RevenueCat SDK configured

## 2. Branding & Core UI (Modern Zen)

✅ **Completed**

- Minimalist, cozy, safe aesthetic
- Pippin capybara mascot throughout
- Night-mode palette with warm accents
- 2-tab bottom navigation (Dump + Lockbox)
- Gold/amber premium theme (Pro features)

## 3. Onboarding (First-Time User Experience)

✅ **Completed**

- 6-screen carousel flow
  1. Validation: "Hi, I'm Pippin"
  2. Reassurance: "Your brain isn't broken"
  3. Survey: Worry type selection (4 options)
  4. Method: Explain lock mechanic
  5. Contract: Trust checkboxes
  6. Handoff: Dynamic CTA to start
- Preferences stored (@capacitor/preferences)

## 4. Authentication (Firebase + Anonymous)

✅ **Completed**

- Firebase Anonymous Auth (no forced sign-up)
- Custom ID linking (optional email/password)
- 100% usable after onboarding
- All data synced to Firestore
- Optional Pro subscription via RevenueCat

## 5. The "Dump" Screen (Tab 1)

✅ **Completed**

- Distraction-free text editor
- Multi-line auto-expanding textarea
- Voice input with speech recognition
- Customizable lock duration (1h, 6h, 12h, 24h)
- Bloom effect (flower animation)
- Primary CTA: "Lock it Away"
- Sleeping Pippin visual
- Real-time save to Firestore

## 6. The "Lockbox" Screen (Tab 2)

✅ **Completed**

- Reverse-chronological list of dumps
- Real-time Firestore sync
- Locked state:
  - Date/time, locked icon, live countdown timer
  - Gentle message ("Pippin is guarding this")
  - Locked visual (blurred or greyed)
- Unlocked state:
  - After bloom time, unlocked icon, tap to read
  - Preview text (2 lines)
  - Full modal view with harvest option

## 7. Core Logic: Lock & Bloom Mechanics

✅ **Completed**

- On "Lock it Away":
  - Calculate unlockAt (now + bloomDuration)
  - Create dump with: content, sentiment, flower type, language
  - Save to Firestore
  - Schedule local notification
  - Show bloom animation
  - Clear textarea & navigate to Lockbox
- Bloom Types: lavender, rose, sunflower, etc. (customizable per dump)
- Duration: Configurable (1h, 6h, 12h, 24h)
- Boost (Pro): Skip the lock entirely

## 8. Core Logic: Notifications & Reminders

✅ **Completed**

- Unlock Reminder (after bloom time):
  - "Pippin says: Your thought from {date} is unlocked and ready to review."
- Daily Reminder (configurable in Settings):
  - "It's {reminderTime}. Ready to quiet your mind?"
  - Toggle on/off in Settings
  - User-selected time

## 9. Settings & Profile Page

✅ **Completed**

- \*\*Phase 1: MVP ✅ (Completed Dec 2025)

- [x] Project scaffolding (Next.js + Capacitor)
- [x] UI/branding setup (Modern Zen aesthetic)
- [x] Onboarding carousel (6 screens)
- [x] Dump screen logic (lock/bloom mechanics)
- [x] Lockbox screen logic (countdown/unlock)
- [x] Firestore integration (offline persistence)
- [x] Local notifications (unlock + daily reminders)
- [x] Settings page (preferences, account management)
- [x] Voice input (multi-language support)
- [x] Security features (biometric lock, privacy screen)

### Phase 2: Monetization ✅ (Completed Dec 2025)

- [x] RevenueCat SDK integration
- [x] Paywall modal (luxury design, select-then-buy)
- [x] Subscription offerings (Monthly, Yearly, Lifetime)
- [x] Firestore webhook sync (subscription status)
- [x] Premium features gate (Boost, Greenhouse, Letters)
- [x] ProfileCard gamification (stats, badges)
- [x] Purchase restoration flow
- [x] Production Firestore security rules
- [x] Webhook deployment strategy

### Phase 3: Polish & Launch 🔄 (In Progress)

- [x] App Store assets (icon, screenshots)
- [x] Legal pages (Terms, Privacy Policy)
- [x] Performance optimization
- [x] Testing checklist
- [ ] App Store submission
- [ ] TestFlight beta testing
- [ ] Public launch (iOS)
- [ ] Android Play Store submission

### Phase 4: AI & Intelligence 📋 (Q1 2026)

- [ ] Cloud Functions setup (AI analysis)
- [ ] Sentiment analysis integration
      Create a `.env.local` file in the root directory:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# RevenueCat Configuration
NEXT_PUBLIC_REVENUECAT_IOS_KEY=appl_xxxxxxxxxxxxx
NEXT_PUBLIC_REVENUECAT_ANDROID_KEY=goog_xxxxxxxxxxxxx

# Server-side Only
REVENUECAT_WEBHOOK_SECRET=your_webhook_secret

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_API_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (web)
npm run build

# Build for mobile (iOS/Android)
npm run mobile

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Generate app icons/splash screens
npm run generate-assets
```

### RevenueCat Setup

1. **Create Products** in App Store Connect (iOS) and Google Play Console (Android)

   - Monthly: `pippin_pro_monthly`
   - Yearly: `pippin_pro_yearly`
   - Lifetime: `pippin_pro_lifetime`

2. **Configure RevenueCat Dashboard**

   - Create entitlement: `pro_access`
   - Link products to entitlement
   - Enable webhook integration

3. **Webhook Configuration**

   - Endpoint: `https://yourdomain.com/api/revenuecat-webhook`
   - Authorization: Add `REVENUECAT_WEBHOOK_SECRET` header
   - Events: Enable all subscription events

4. **Firestore Integration**
   - Deploy rules: `./deploy-firestore-rules.sh`
   - Webhook syncs to `users/{userId}/subscriptions` collection
   - See [REVENUECAT_SYNC_GUIDE.md](REVENUECAT_SYNC_GUIDE.md) for details

### Build Commands

```bash
# Web deployment
npm run build
# Output: /out (static export)

# iOS build
npx cap add ios
npm run mobile
npx cap open ios
# Open in Xcode → Product → Archive

# Android build
npx cap add android
npm run mobile
npx cap open android
# Build → Generate Signed Bundle/APK
```

### Documentation

- [REVENUECAT_SETUP.md](REVENUECAT_SETUP.md) - Complete monetization guide
- [REVENUECAT_SYNC_GUIDE.md](REVENUECAT_SYNC_GUIDE.md) - Webhook & Firestore sync
- [FIRESTORE_GUIDE.md](FIRESTORE_GUIDE.md) - Database structure & queries
- [FIRESTORE_RULES_DEPLOYMENT.md](FIRESTORE_RULES_DEPLOYMENT.md) - Security rules
- [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) - QA procedures
- [PERFORMANCE_OPTIMIZATION_GUIDE.md](PERFORMANCE_OPTIMIZATION_GUIDE.md) - Optimization tips
- [APP_STORE_DESCRIPTIONS.md](APP_STORE_DESCRIPTIONS.md) - Marketing copyx] ProfileCard gamification
- [ ] App Store submission
- [ ] Webhook deployment
- [ ] Sandbox testing

### Post-Launch Phase 📋

- [ ] AI analysis (Pippin Letters)
- [ ] Insights dashboard
- [ ] Cloud backup (encrypted)
- [ ] Social sharing
- [ ] Advanced analytics
- [ ] Integrations (Apple Health, Notion)
- [ ] Premium perks (flowers, themes)
- [ ] Community features

---

## Deployment & Configuration

### Environment Variables

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_REVENUECAT_IOS_KEY=...
NEXT_PUBLIC_REVENUECAT_ANDROID_KEY=...
REVENUECAT_WEBHOOK_SECRET=... (Server-side only)
```

### RevenueCat Setup

1. Create iOS/Android products in App Store Connect & Google Play Console
2. Configure entitlement "pro_access" in RevenueCat
3. Add webhook endpoint: `https://yourdomain.com/api/revenuecat-webhook`
4. Set authorization header with REVENUECAT_WEBHOOK_SECRET

### Capacitor Build

```bash
# Web
npm run build

# iOS
npx cap add ios
npx cap copy
npx cap open ios

# Android
npx cap add android
npx cap copy
npx cap open android
```

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE.md file for details.
