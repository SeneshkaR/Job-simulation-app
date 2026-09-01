# Career Trial — Try Before You Choose

An AI-powered **web application** (also runs as a mobile app) that lets students actually experience **50 real careers** before committing years and money to them. Built with Expo + React Native Web so one codebase ships to Web, iOS, and Android.

## What it is

Instead of reading Wikipedia articles about jobs, students **live one workday** or **survive a full workweek** as a nurse, software engineer, lawyer, pilot, electrician, and many more. AI colleagues chat with them, meetings pop up, deadlines hit, and stress builds — just like the real thing.

## Features

### Three tiers of career trial per career
- **15-Minute Quick Trial** — Short lecture + interactive scenarios (prioritize/decide) tailored to age group (teen or young adult).
- **Full-Day Simulation** — Live a workday from morning stand-up to wrap-up. Manage energy, stress, and task choices. Random urgent events hit mid-day.
- **Full-Week Simulation** — 5 days of random calls, colleague messages, team meetings, and deadlines. Balance team mood, project progress, and burnout.

### Humanized AI colleagues
Every career has 2-3 personas (senior developer, charge nurse, etc.) with distinct personalities and OpenAI-powered chat. Falls back to smart mock replies without an API key.

### AI-scored performance
Your decisions are scored across 5 dimensions: Technical Skills, Decision Making, Communication, Problem Solving, Career Fit. Includes personalized strengths + growth areas.

### 50 careers covered across 14 categories
**Technology:** Software Engineer, Data Scientist, Cybersecurity Analyst, Cloud Engineer, Game Developer, AI/ML Engineer

**Healthcare:** Registered Nurse, Pharmacist, Physical Therapist, Dentist, Veterinarian, Physical Therapist Assistant

**Engineering:** Civil Engineer

**Business:** Digital Marketer, Accountant, Financial Analyst, Human Resources Manager, Product Manager, Management Consultant, Supply Chain Analyst, E-commerce Entrepreneur, Public Relations Specialist, Real Estate Agent

**Education:** Teacher, School Counselor

**Law:** Lawyer

**Design:** UX/UI Designer, Graphic Designer, Architect

**Science:** Psychologist, Biomedical Scientist, Environmental Scientist, Meteorologist

**Trades:** Electrician, Plumber, HVAC Technician, Welder

**Creative:** Video Editor, Journalist, Musician/Composer, Content Creator/YouTuber

**Public Service:** Police Officer, Firefighter, Social Worker, Diplomat/Foreign Service Officer

**Hospitality:** Chef, Hotel Manager

**Sports & Wellness:** Personal Trainer, Athletic Trainer/Coach

**Transportation:** Airline Pilot

## Running as a web application

```bash
cd "D:\job simulation ai"
npm install
npm run web

Then open the URL that appears in the terminal (usually http://localhost:8081 or http://localhost:19006). On desktop the app displays inside a centered phone frame with brand messaging; on narrow browsers or mobile it goes full-bleed like a native app.

### Build a static production site

```bash
npm run build:web       # bundles to ./dist
npm run serve:web       # serves ./dist at http://localhost:3000
```

You can then deploy the `dist/` folder to any static host: Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, etc.

## Running as a mobile app (optional)

```bash
npx expo start
```

Scan the QR with the Expo Go app on your phone, or press `a` for Android emulator / `i` for iOS simulator.

## Enable real AI chats (optional)

1. Get an OpenAI API key at https://platform.openai.com/api-keys
2. Open the app → Settings tab → paste key → Save

Without a key, the app runs in demo mode with realistic mock replies.

## Project structure

```
src/
  screens/           — All UI screens
    trial/           — Quick, Day, Week trial screens
  data/careers.js    — All 10 careers with colleagues, exercises, schedules, event pools
  services/aiService.js — OpenAI chat + scoring (with mock fallback)
  navigation/        — Stack + tab navigation
  context/           — Global state (React Context + useReducer)
  theme/             — Dark palette, typography, spacing, shadows
App.js               — Entry point; wraps the app in a phone frame on desktop web
app.json             — Expo config; web section sets Metro bundler + PWA meta
```

## Tech

- **Expo SDK 51** — one codebase for Web, iOS, Android
- **react-native-web 0.19** — renders every RN component as HTML/CSS in the browser
- **React Navigation v6** — stack + bottom tabs (works identically on web)
- **expo-linear-gradient** — vibrant gradients throughout
- **OpenAI GPT-4o-mini** — colleague personas + performance scoring (via `fetch`, works on web)
- **React Context + useReducer** — no Redux, just clean state

## Design principles

1. **Feels like a game, teaches like a mentor** — energy/stress meters, live scores, progress bars.
2. **Never a plain Q&A quiz** — every exercise uses drag-to-rank, scenario choices, or timed decisions.
3. **Beautiful dark UI** — career-specific color gradients, glow shadows on primary buttons.
4. **Age-adaptive** — content difficulty adjusts for teens (13-17) vs young adults (18-24).
5. **Offline-capable** — full experience even without OpenAI key thanks to mock replies.
6. **Cross-platform from day one** — the same components render on web, iOS, and Android.

## Educational impact

Students discover in 15 minutes whether they'd actually enjoy the day-to-day work of a career — before spending 4 years and $80k on a degree. Schools and career counselors can use it as a pre-college exploration tool.
