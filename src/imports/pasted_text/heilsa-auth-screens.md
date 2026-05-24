You are working on Heilsa.

Goal:
Create polished authentication screens in Figma for Heilsa using the GitHub design system as the source of truth.

GitHub repository:
https://github.com/OMAJOR/heilsa

Design system file:
docs/design/heilsa_design_system.html

Use the Heilsa design system tokens and component style from the repo.
Do not invent random colors, spacing, typography, shadows, or button styles.

Task:
Create 3 different design explorations for the Heilsa authentication screen.

Each exploration must include:
1. Login state
2. Sign up state
3. Language dropdown state

This is only for auth screens.
Do not create onboarding yet.

Brand requirements:
- App name: Heilsa
- Use the real Heilsa logo mark if available
- Logo should look premium, clean, and correctly sized
- Company/app name should be visible and well-positioned
- Overall feel: modern, sleek, premium health-tech, calm, trustworthy

Design system requirements:
Use the Heilsa palette:
- Teal: #3ECFB2
- Blue: #5CA8E8
- Violet: #8B7CF8
- Navy: #1E2A45
- Gold: #D4A853 only for premium
- Background: #F6F8FB
- Surface: #FFFFFF
- Border: #D8DDE8
- Muted text: #9BA5B8
- Body text: #5D6880

Use:
- 16px screen padding
- 24px section spacing
- 12px card/list gaps
- 16px card padding
- 12px input/button radius
- 16px main card radius
- 24px modal/dropdown radius where needed
- Soft shadows only

Do not use:
- Harsh shadows
- Random gradients
- Random card styles
- Emoji icons
- Fake brand logos
- Cluttered layouts
- Text touching edges
- Buttons touching other buttons

Authentication functionality:

Login form fields:
- Email
- Password

Login actions:
- Log in
- Sign in with Google
- Forgot password
- Switch to Sign up

Sign up form fields:
- First name
- Last name
- Email
- Password

Sign up actions:
- Create account
- Sign up with Google
- Switch to Log in

Language dropdown:
- Should appear near the top or in a clean settings/control position
- Must look modern and compact
- Should support:
  - English
  - Spanish
  - French
  - German
  - Arabic
- Show selected language
- Include open dropdown state
- Arabic should imply RTL support later, but do not redesign the whole screen for RTL yet

Important interaction behavior:
The screen should transition cleanly between Login and Sign up.

When Login is active:
- Show Login title
- Show email/password fields
- Show Log in CTA
- Show “Don’t have an account? Sign up”
- Do not show first name / last name fields

When Sign up is active:
- Show Sign up title
- Show first name, last name, email, password fields
- Show Create account CTA
- Show “Already have an account? Log in”
- Do not show forgot password as the main action

The switch between Login and Sign up should feel modern and sleek:
- Use segmented control, tabs, or smooth card transition
- Fields should appear/disappear cleanly
- Layout should not jump awkwardly
- CTA text must update correctly:
  - Login state uses “Log in”
  - Sign up state uses “Create account”
- The alternate link must update correctly:
  - Login state shows “Sign up”
  - Sign up state shows “Log in”

Google sign-in:
- Use the correct modern Google “G” style, not a random blue circle letter
- Do not use an incorrect fake Google logo
- Button should read:
  - “Continue with Google”
- Button should be clean, accessible, and visually aligned with the form

Screen explorations:

Exploration 1 — Centered Card
- Mobile-first
- Logo and Heilsa name centered at top
- Auth card centered vertically
- Segmented Login / Sign up control inside the card
- Language dropdown in top-right
- Clean white card on soft background

Exploration 2 — Split Brand + Form
- Left/top brand area with logo, product promise, and subtle health dashboard preview
- Right/bottom form card
- Works for web and mobile
- Still simple and not marketing-heavy
- Language dropdown in the header

Exploration 3 — Minimal Premium
- Very clean layout
- Large whitespace
- Logo top-left
- Form content stacked with premium spacing
- Login/sign up switch as sleek pill tabs
- Language dropdown as compact pill
- No unnecessary decoration

Create versions for:
- iOS mobile frame
- Android mobile frame
- Web desktop frame

Important:
The iOS and Android screens should look like the same Heilsa design.
They should only differ in safe area spacing and frame size.
Do not make Android visually unrelated to iOS.

Web should adapt the same design system to a wider layout.

Required components:
- Logo lockup
- Auth card
- Text input
- Password input
- Primary button
- Google button
- Ghost/text button
- Language dropdown
- Segmented login/sign-up switch
- Error message style
- Loading button state
- Disabled button state

States to include:
- Login default
- Sign up default
- Language dropdown open
- Input focused
- Password hidden/shown icon
- Error state:
  “Check your email and password.”
- Loading state:
  “Signing in...”
- Disabled state when required fields are empty

Accessibility:
- Inputs must have labels
- Buttons must have clear text
- Tap targets minimum 44px
- Text must not overflow
- Color contrast must be readable

Output:
Create a Figma page named:
Auth Screens — v0.07

Include:
- 3 design explorations
- Each exploration has Login, Sign up, and Language dropdown open state
- iOS, Android, and Web versions
- Clear labels for every frame
- Editable layers
- Auto Layout where possible
- Components should follow the Heilsa design system and reusable library patterns

Do not create onboarding yet.
Stop after auth screens and wait for approval.