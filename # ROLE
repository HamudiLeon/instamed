# ROLE

You are a principal full-stack architect and senior frontend engineer specializing in:
- React
- Vite
- TypeScript
- Mobile-first web apps
- High-performance feed/reel interfaces
- Medical EdTech
- Learning systems with spaced repetition
- Instagram-grade UX patterns without cloning proprietary branding/assets

Your task is to generate the **complete initial scaffold** for a production-minded web app that feels like a modern Instagram Reels experience, but is purpose-built for **medical study**, **clinical case drills**, **anatomy image learning**, **quiz-style reels**, and a **Duolingo-like vocabulary/memory trainer**.

The product is a **mobile-first Study Reels app** for medical students.

---

# PRODUCT VISION

Build a web app that combines:

1. **Instagram/TikTok-like vertical reel feed**
   - full-screen vertical cards
   - swipe/drag navigation
   - snappy transitions
   - preloaded next items
   - immersive mobile-first experience

2. **Medical study content**
   - clinical vignettes
   - image-based anatomy cards
   - pathology/pathophysiology recall cards
   - flash-style reveal cards
   - rapid exam-style Q&A
   - Next Best Step / diagnosis / mechanism prompts

3. **Quiz + trainer modes**
   - multiple-choice quiz reels
   - short-answer/reveal cards
   - hotspot/label anatomy image cards
   - medical terminology and vocabulary trainer
   - Duolingo-like streak/progress/review feeling

4. **Social/content creation layer**
   - real user posts
   - educator/influencer channels
   - themed decks
   - saved collections
   - creator mode for publishing learning reels
   - study channels such as:
     - Step 1
     - Step 2 CK
     - Anatomy
     - Physiology
     - Pharmacology
     - Pathology
     - Microbiology
     - Vocabulary trainer
     - Clinical pearls
     - OSCE/clinical reasoning

---

# IMPORTANT DESIGN PRINCIPLE

The app should feel like:
- modern
- addictive in a good way
- ultra-fast
- swipe-native
- tactile
- polished
- social-first

But it must remain clearly a **medical study platform**, not a meme or entertainment clone.

Do **not** copy copyrighted Instagram UI text, icons, assets, logos, or branding.
Do emulate:
- vertical immersive reel UX
- bottom-sheet overlays
- progressive disclosure
- creator/channel affordances
- modern feed ergonomics
- fluid gesture interactions
- clean typography hierarchy
- crisp progress cues

---

# TECH STACK REQUIREMENTS

Use:

- **Vite**
- **React**
- **TypeScript**
- **HeroUI**
- **Zustand**
- **Motion for React** (Framer Motion ecosystem)
- **React Router**
- **TanStack Query** for async data fetching/cache
- **Zod** for schema validation
- **React Hook Form** for creator forms
- **Lucide React** for icons
- **dayjs** for dates
- **clsx** for class composition

Optional but recommended:
- **react-virtuoso** or similar virtualization where useful
- local persistence with **localStorage** or **IndexedDB**
- mock backend layer using local JSON or mock service

Style approach:
- prefer a modern utility-first strategy if needed
- you may use Tailwind if it accelerates HeroUI integration
- if Tailwind is added, configure it correctly
- keep the theme dark-first and AMOLED-friendly

---

# CORE APP MODULES TO SCAFFOLD

Generate a full project scaffold with these modules:

## 1. App Shell
- mobile-first layout
- safe-area aware
- bottom tab navigation
- feed-focused viewport
- route-based architecture

## 2. Reel Feed
- full-screen vertical feed
- each reel occupies one viewport height
- smooth drag/swipe transitions
- supports:
  - study cards
  - quiz cards
  - anatomy image cards
  - vocabulary trainer cards
  - social/creator posts
- preload next 5 reels
- keep previous 2 in memory for snap-back feel
- zero-lag scrolling objective

## 3. Study Card Engine
Support card types:

### A. Clinical vignette
- stem
- question
- hidden answer
- hidden explanation
- differential diagnosis
- key teaching points
- tags
- difficulty
- estimated time
- review metadata

### B. Image anatomy card
- image URL
- hotspot definitions
- labels
- reveal states
- optional question
- optional hint
- answer explanation

### C. MCQ reel
- stem
- answer options
- correct answer
- distractor explanations
- reveal state
- difficulty
- exam tags

### D. Vocabulary trainer reel
- term
- pronunciation
- simple definition
- advanced definition
- synonym / related concept
- example usage
- memory clue / mnemonic
- spaced repetition stats

### E. Social creator reel
- creator/channel info
- caption
- media
- CTA
- save/share/like/bookmark shell actions
- educational metadata

## 4. Channel System
Support channels such as:
- For You
- Following
- Step 1
- Step 2 CK
- Anatomy
- Pathophysiology
- Pharmacology
- Rapid Review
- Vocabulary
- Clinical Cases
- Creator Channels

Each reel belongs to one or more channels.

## 5. Creator Studio
Scaffold a creator form flow for publishing:
- clinical case reel
- anatomy reel
- vocabulary reel
- quiz reel
- social educational post

Need:
- validation
- preview mode
- draft mode
- publish action to mock API/store

## 6. Review System / Spaced Repetition
Implement a simple client-side SR engine.
Need:
- first seen date
- ease factor
- stability proxy
- interval days
- dueAt timestamp
- lapse count
- success streak
- card priority score

The algorithm should be:
- lighter than Anki
- understandable
- deterministic
- client-side friendly
- suitable for fast repeated interactions inside a reel feed

## 7. Progress / Gamification
Add:
- daily goal
- streak
- XP/progress
- per-channel mastery
- session completion progress
- review due count
- weak-area surfacing

## 8. Saved / Library
- bookmarked cards
- saved decks
- creator posts
- review later
- due cards

---

# DELIVERABLES

Generate all of the following:

## A. Project folder structure
Show the complete recommended folder tree.

## B. Package setup
Provide:
- package.json
- dependencies
- devDependencies
- scripts

## C. App architecture
Explain:
- route layout
- state boundaries
- query/cache boundaries
- UI composition
- rendering strategy
- prefetch strategy

## D. TypeScript domain models
Create strong interfaces/types/Zod schemas for:
- Reel
- StudyCard
- ClinicalCaseCard
- AnatomyImageCard
- MCQCard
- VocabularyCard
- SocialPostCard
- CreatorProfile
- Channel
- ReviewState
- FeedState
- SessionStats

## E. JSON schema + sample data
Provide realistic sample JSON for:
- one Clinical Case card
- one Anatomy card
- one MCQ card
- one Vocabulary trainer card
- one Social educational reel

## F. State management with Zustand
Create stores for:
- feed queue
- current reel index
- review state
- session stats
- saved cards
- channels
- creator drafts

## G. React components
Generate code for the main components, including at minimum:

- `App.tsx`
- `main.tsx`
- `router.tsx`
- `layouts/MobileShell.tsx`
- `features/feed/ReelContainer.tsx`
- `features/feed/ReelViewport.tsx`
- `features/feed/ReelCard.tsx`
- `features/feed/ReelStack.tsx`
- `features/feed/FeedProgressOverlay.tsx`
- `features/feed/FeedSkeleton.tsx`

- `features/cards/ClinicalCaseCard.tsx`
- `features/cards/AnatomyImageCard.tsx`
- `features/cards/MCQCard.tsx`
- `features/cards/VocabularyCard.tsx`
- `features/cards/SocialStudyPostCard.tsx`
- `features/cards/RevealPanel.tsx`
- `features/cards/ChoiceList.tsx`
- `features/cards/HotspotImage.tsx`

- `features/review/reviewStore.ts`
- `features/review/sr.ts`

- `features/channels/ChannelTabs.tsx`
- `features/channels/ChannelPage.tsx`

- `features/creator/CreatorStudioPage.tsx`
- `features/creator/forms/ClinicalCaseForm.tsx`
- `features/creator/forms/VocabularyForm.tsx`
- `features/creator/forms/AnatomyForm.tsx`
- `features/creator/forms/QuizForm.tsx`

- `features/profile/ProfilePage.tsx`
- `features/library/LibraryPage.tsx`
- `features/progress/ProgressPage.tsx`

- `components/ui/AppBottomNav.tsx`
- `components/ui/TopGradientOverlay.tsx`
- `components/ui/BottomBlurPanel.tsx`
- `components/ui/StatPill.tsx`
- `components/ui/EmptyState.tsx`

## H. HeroUI usage
Use HeroUI components intentionally:
- `Card`
- `Skeleton`
- `Progress`
- `Tabs`
- `Chip`
- `Button`
- `Modal`
- `Input`
- `Textarea`
- `Avatar`

Use `Card` in a visually layered way suitable for reel content.
Use `Skeleton` for preloading reel placeholders.
Use `Progress` for review/session progress.
Use blurred overlays / footer overlays where elegant.

## I. Motion integration
Implement vertical swipe interactions with Motion:
- drag axis y
- threshold-based snap
- spring feel
- active card emphasis
- reduced-motion fallback
- layout animation where appropriate

## J. Mock data + mock API
Create:
- local mock dataset
- fake async fetch helpers
- prefetch next 5 reel strategy
- channel-filtered feeds
- random mix for “For You”

## K. Speed/performance strategy
Implement or scaffold:
- memoization boundaries
- lazy mounting
- image preloading
- next 5 reel prefetch
- avoid rerender storms
- minimal active DOM
- optimistic warm cache
- preserve gesture smoothness

## L. SR algorithm
Provide:
1. conceptual explanation
2. actual implementation
3. how the reel UI should react after:
   - easy
   - good
   - hard
   - again

Need a simplified scoring model such as:

- new card default interval: minutes/hours/day
- good increases interval
- easy increases more
- hard reduces ease and shortens interval
- again resets interval and increments lapse count

Also derive a queue priority score from:
- overdue amount
- difficulty tag
- lapse count
- weak area multiplier
- recency penalty

## M. Accessibility
Include:
- keyboard support
- screen-reader labels
- reduced motion mode
- good contrast
- focus handling for interactive quiz answers

## N. Responsive strategy
Primary target:
- mobile portrait

Also support:
- tablet
- desktop centered phone-frame layout

## O. Theming
Create a dark-first medical aesthetic:
- neutral dark background
- subtle depth
- high contrast text
- accent colors per channel/topic
- premium not childish

---

# UX REQUIREMENTS

The reel experience should include:

- top channel selector
- current session progress
- card difficulty chip
- save/bookmark action
- quick rating buttons after reveal:
  - Again
  - Hard
  - Good
  - Easy
- bottom explanation/reveal sheet
- swipe up/down between cards
- long-press optional reveal hint
- next due card indicators
- streak / XP micro-feedback
- creator attribution on social reels

For quiz/vocabulary cards:
- do not reveal everything instantly
- force a small interaction before answer
- maintain fast loop

For clinical cards:
- preserve exam style
- mechanism first, answer after
- explanation panel should feel premium and compact

---

# DATA MODEL REQUIREMENTS

Design a flexible JSON structure that supports:
- text-only cards
- image anatomy cards
- hotspots
- reveal states
- MCQ choices
- channel membership
- creator ownership
- SR metadata
- optional social metrics
- content versioning
- tags like:
  - `step1`
  - `step2`
  - `anatomy`
  - `pathophysiology`
  - `pharmacology`
  - `micro`
  - `vocab`
  - `rapid-review`

Need discriminated unions by `type`.

Example reel types:
- `clinical_case`
- `anatomy_image`
- `mcq`
- `vocab`
- `social_post`

---

# REEL CONTAINER REQUIREMENTS

Provide a strong initial implementation for `ReelContainer` that:
- renders only a narrow active window
- supports vertical drag/swipe
- animates between cards
- calls prefetch for next 5 items
- uses Zustand store selectors for minimal rerenders
- works with mock data immediately

---

# FEED/PERFORMANCE REQUIREMENTS

Implement this exact strategy:

1. On initial load:
   - fetch first 7 reels
   - render current + next + previous placeholders strategically

2. In background:
   - prefetch next 5 reels after current index changes
   - warm image assets for image-based cards
   - cache channel-local feed results

3. Rendering:
   - keep only a small active window mounted
   - use skeletons during prefetch
   - avoid mounting heavy explanation panels until needed

4. Interaction:
   - gestures must remain responsive even during loading
   - state updates should not block animation frames

5. Persistence:
   - persist review state locally
   - persist saved cards locally
   - optionally persist creator drafts locally

---

# OUTPUT FORMAT

Your response must be structured exactly in this order:

1. **Architecture Summary**
2. **Folder Structure**
3. **Data Models / Types**
4. **Sample JSON Data**
5. **Spaced Repetition Algorithm**
6. **State Management Design**
7. **Prefetch + Performance Strategy**
8. **React Component Scaffold**
9. **Core File Implementations**
10. **Run Instructions**
11. **Future Extensions**

---

# CODING REQUIREMENTS

- Use TypeScript everywhere
- Provide real code, not pseudo-code unless explicitly marked
- Keep code internally consistent
- Prefer maintainable architecture over cleverness
- Use named exports unless a default export is clearly cleaner
- Add concise comments where design intent matters
- Do not omit imports
- Do not leave TODOs for critical paths
- Make the scaffold runnable
- Where backend is missing, provide mock services and adapters
- Use realistic mock medical content
- Use discriminated unions and type guards cleanly
- Use memoization intentionally, not excessively

---

# SPECIAL PRODUCT REQUIREMENTS FOR MEDICAL LEARNING

The scaffold must support:
- mechanism-focused explanations
- clinical reasoning flow
- differential diagnosis sections
- “Next best step” training
- anatomy label drills
- pathology pattern recognition
- vocabulary reinforcement
- exam tag filtering

Content examples should sound like a serious medical prep product, not generic edtech filler.

---

# REQUESTED EXTRA: MAKE IT FEEL LIKE INSTAGRAM, BUT FOR STUDY

Please explicitly shape the UX to feel like:
- premium social product
- creator ecosystem
- channel-driven content discovery
- vertical media + education hybrid

Include:
- creator avatars
- channel tabs
- save/share shell buttons
- post metadata
- likes/bookmarks placeholder metrics
- polished overlays
- immersive card transitions

But maintain educational primacy:
- answers
- reveal flow
- review actions
- spaced repetition
- progress logic
- quiz interactions

---

# FINAL INSTRUCTION

Generate the full scaffold now.

Do not ask follow-up questions.
Make reasonable architectural decisions yourself.
Be concrete and opinionated.
Optimize for:
- speed
- clarity
- extensibility
- premium mobile UX
- medical study effectiveness
- 