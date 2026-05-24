You are working on Heilsa.

Goal:
Create a premium cross-platform health app design system and screen flow for Web, iOS, and Android.

Before designing screens, understand the Heilsa design system, app functionality, onboarding flow, dashboard chart needs, dropdown behavior, and health data connector experience.

Use the existing Heilsa design system HTML as the source of truth.

DESIGN SYSTEM COLORS

Heilsa uses a calm premium health-tech palette.

Primary brand gradient:
Teal → Blue → Violet
#3ECFB2 → #5CA8E8 → #8B7CF8

Use the gradient only for:
- Logo mark
- Loading indicators
- Premium upgrade CTAs
- Very subtle hero accents when appropriate

Do not use the gradient randomly as a card background.

Core colors:
- Teal: #3ECFB2
- Teal light: #D0F5EE
- Teal dark: #0F9E82
- Blue: #5CA8E8
- Blue light: #DCEFFE
- Blue dark: #2075C4
- Violet: #8B7CF8
- Violet light: #EAE8FF
- Violet dark: #5A45C8
- Navy: #1E2A45
- Navy mid: #2F3E5C
- Gold: #D4A853
- Gold light: #FFF3DC
- Success: #34C78A
- Warning: #F59E0B
- Error: #F24E4E

Neutral colors:
- Surface: #FFFFFF
- Background: #F6F8FB
- Subtle background: #EDF0F5
- Border: #D8DDE8
- Muted text: #9BA5B8
- Body text: #5D6880
- Strong text: #1E2A45

Premium rule:
Gold is only for:
- Premium features
- Premium badges
- Subscription cards
- Usage limit cards
- Upgrade CTAs

Do not use gold for normal dashboard elements.

TYPOGRAPHY

Use clean system fonts unless a project font already exists.

Type scale:
- Screen title: 28px, weight 500
- Section title: 20px, weight 500
- Card title: 16px, weight 500
- Metric number: 32px, weight 500
- Body text: 14px, weight 400, line-height 1.6
- Caption: 12px, weight 400
- Label: 11px, weight 500, uppercase, letter spacing 0.08em

Heilsa should feel calm and premium.
Do not use heavy bold everywhere.

SPACING

Use spacing tokens only:
- Screen padding: 16px
- Section gap: 24px
- Card/list gap: 12px
- Card inner padding: 16px
- Small gap: 8px
- Tiny gap: 4px

Anti-touching rule:
No two visible components should touch edge-to-edge unless they are intentionally inside the same grouped component.

Do not allow:
- Cards touching cards
- Buttons touching buttons
- Icons touching text
- Text touching screen edges
- Bottom navigation overlapping content
- Inputs touching buttons
- Chat bubbles touching each other
- Modals touching screen edges

RADIUS

Use:
- sm: 8px for tags and small controls
- md: 12px for buttons, inputs, metric cards
- lg: 16px for main cards
- xl: 24px for modals and bottom sheets
- full: 999px for pills

SHADOWS

Use soft shadows only:
- Card shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)
- Elevated shadow: 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)

No harsh shadows.

ICON STYLE

Use one consistent icon style only.
Preferred icon style:
- Tabler outline icons

Icon sizes:
- Bottom nav: 22px
- Card icons: 20px
- Inline icons: 18px
- Small label icons: 16px

No random emoji icons in production UI.
No mixed icon families unless impossible.

HEILSA APP FUNCTIONALITY

Heilsa is a premium cross-platform health and wellness app for:
- Web
- iOS
- Android

Purpose:
Heilsa helps users connect health data, understand their body, track food, workouts, symptoms, medications, labs, recovery, sleep, heart rate, and talk to an AI health assistant.

Core product idea:
Heilsa is a daily health operating system.

The app should answer:
1. What is my health status today?
2. What changed compared with recent days?
3. What needs attention?
4. What have I logged today?
5. What data is missing?
6. What should I do next?

PRIMARY NAVIGATION

Use five main areas:
1. Home
2. Scan
3. Health
4. AI Chat
5. Profile / Settings

Secondary areas:
- Data Sources
- Meals / Nutrition
- Workouts
- Medications
- Labs
- Symptoms
- Recovery
- Sleep
- Premium
- Privacy
- Notifications

PLATFORM RULE

The app must have:
- iOS version
- Android version
- Web version

All platforms must have the same functionality and same Heilsa visual identity.

Differences should only be:
- Screen size
- Safe area spacing
- Bottom nav vs sidebar
- Web grid layout
- Native platform spacing behavior

Do not make Android look like a different app from iOS.
Do not make Web look like a different brand.

AUTHENTICATION FUNCTIONALITY

Screens:
- Welcome
- Login
- Sign up
- Forgot password
- Auth error state
- Language selection

Features:
- Email/password login
- Google OAuth
- Apple Sign In where supported
- Forgot password
- Session handling
- Error handling
- Language selection

Platform notes:
- Web: Supabase Auth + Google OAuth
- iOS: Supabase Auth + Apple Sign In where supported
- Android: Supabase Auth + Google OAuth

HEALTH DATA CONNECTIONS

Create a beautiful “Connect Your Health Data” experience.

This should be one of the most polished parts of the app.

Purpose:
Let users connect health platforms, wearables, smartwatches, nutrition trackers, glucose monitors, scales, sleep trackers, fitness devices, and health records.

Important:
Do not use real brand logos unless approved.
Use generic icons or clean placeholder marks.

Connection screen sections:
1. Recommended for your device
2. Connected sources
3. Available sources
4. Nutrition sources
5. Sleep and recovery sources
6. Glucose and metabolic sources
7. Medical records
8. Sync issues

Each connector card should show:
- Generic icon
- Source name
- Category
- Connected / disconnected / syncing / error state
- Last synced time
- Permissions summary
- Connect / Manage / Reconnect / Disconnect button

Connector states:
- Connected
- Disconnected
- Syncing
- Error
- Permission needed
- Coming soon
- Native only
- Web OAuth only

Important connectors to include:
- Apple Health
- Apple Watch
- HealthKit
- Android Health Connect
- Google Fit
- Samsung Health
- Fitbit
- Garmin
- Oura
- WHOOP
- Withings
- Polar
- Wahoo
- Eight Sleep
- Dexcom
- Abbott LibreView
- Cronometer
- MyFitnessPal
- Strava
- Peloton
- Zwift
- Health Records
- Apple Health Records
- Smart scale
- Smart ring
- Glucose monitor
- Blood pressure monitor
- Sleep tracker
- Fitness band
- Nutrition tracker

Platform-specific connector behavior:
- iOS: Apple Health / HealthKit should be primary and featured first
- Android: Health Connect should be primary and featured first
- Web: show synced data and OAuth-based web sources

Connection UX:
- Use a search bar
- Use category filters
- Use status badges
- Use a clean permissions screen
- Show exactly what data will be read
- Show privacy reassurance
- Show sync error states clearly
- Never fake a connected source

DASHBOARD FUNCTIONALITY

The Home dashboard is controlled by selectedDate.

Use two separate concepts:
- currentDate = actual today
- selectedDate = date user is viewing

Behavior:
- App opens on currentDate
- Today updates automatically after midnight
- User can select past dates
- If selectedDate is today, show live data
- If selectedDate is past, show that day’s saved data
- If no data exists, show “No data yet”
- Today button returns to real current date

Home dashboard sections:
1. Header
2. Date selector
3. Today’s overview
4. Recovery and readiness
5. Heart health
6. Sleep
7. Activity
8. Nutrition
9. Hydration
10.