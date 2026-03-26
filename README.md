# InstaMed

Mobile-first study reels app for medical learning.

## What it is

InstaMed combines:
- short-form vertical learning sessions
- vocabulary training
- quiz/MCQ drills
- spaced repetition signals
- creator-style browsing and session launch

Current focus:
- immersive reel-style study sessions
- JSON-driven medical vocabulary and quiz decks
- imported deck support from `studywithme-bg`

## Stack

- Vite
- React + TypeScript
- HeroUI
- Zustand
- TanStack Query
- Motion for React
- React Router
- Zod

## Run

Install and start locally:

```bash
npm install
npm run dev
```

For LAN/mobile testing on macOS:

```bash
./run.sh
```

## Data

The app currently uses:
- local scaffold/mock reels
- imported StudyWithMe Medical Latin decks in `src/data/studywithme/med-latin`

Session modes:
- `vocab`
- `quiz`
- `mixed`

## Goal

Build a premium, high-speed medical study experience that feels native to vertical social apps while remaining clearly optimized for learning.
