# 0007 — NotchTap: the goal is fixing the UI himself, not learning Tauri

Date: 2026-08-03
Subjects touched: `notchtap-tauri` (active)

## What the user said

"I have been relying on AI to fix the animations and some of the workflow but now I think
I have to step in. I need to know how data is coming, stored, what data, when and how, and
how things are rendered and animations are triggered."

## What that changes

Tauri is not the subject. It is the boundary he crosses when the answer stops being a
frontend answer. The subject is **the NotchTap repo as a system he can debug unaided**,
with animations as the presenting complaint.

Reordering that follows: teach the data path and the animation-trigger taxonomy first, and
only then Tauri commands/capabilities (plan items nt-8 to nt-10 stay where they are).

## The taxonomy taught in lesson 0001

Every animation in NotchTap starts one of three ways:

1. **Surface swap** — a child mounts/unmounts inside `AnimatePresence` (`App.tsx`), decided
   by the three-line `presentationMode()` in `src/lib/presentation.ts`.
2. **Content swap** — a React `key` changes (`swapKey = slot.id`, else `"idle"`) in
   `StatusRailCard.tsx`, so the old node exits and a new one enters.
3. **Class flip** — a boolean (`hovered`, `exiting`) adds a class and CSS transitions it.

All durations come from `src/animationTiming.ts`; several are locked to a CSS literal by
`animationTiming.test.ts`, so a one-sided edit fails CI on purpose. This is the single most
useful fact for him: retune the constant, not the stylesheet.

## Facts verified in the repo on this date

- The overlay has exactly **seven** inbound event channels; `rg -n 'listen<' src` proves it.
- They are: `slot-state`, `status-state`, `agent-state`, `tab-selection-changed`,
  `agent-viewed-session-changed`, `appearance-changed`, `hover-changed`.
- Hover is a Rust-side native tracking area (`lib.rs:1617`), not a CSS `:hover` rule,
  because the window is largely click-through.
- Rust emits **on change only** (`emit_tab_selection_if_transitioned`,
  `status_state_if_changed`). No heartbeat. So a frozen screen usually means a wire that
  never fired.
- Boot race is covered twice: `lib.rs` plants `window.__NOTCHTAP_*` globals at page load
  **and** emits. Both paths run the same validator.
- Every hook validates its payload field by field and falls back to empty. A Rust enum
  gaining a variant without the TypeScript list being updated makes cards silently vanish.
- State storage is deliberately plain: one `useState` per hook, `App.tsx` as the only
  meeting point, plain props below. No context, no store.

## What he named as the target (same session)

Not a single defect — the whole state ladder:

1. idle / minimal / compact / expanded
2. how every section animates between them, and the variants of each
3. the settings panel, mostly plain UI fixes

His four words map onto real class names: `bare` = minimal, no state class = idle,
showing-without-`expanded` = compact, `expanded` = expanded. Four more states he did not
name are where the bugs usually are: `promoting`, `exiting`, `exit-to-bare`, `hovered`.
All nine are assembled as a class list in `StatusRailCard.tsx:704`, decided by
`useExitChoreography.ts`. That is lesson 0002's spine.

## Standing architecture ideas (his, recorded not judged)

Captured with takes in `notchtap-tauri/ideas.html`:

1. Unify Rust/TS types — real pain (the tab set is hand-written in six places); today's
   answer is drift-detecting parity tests, not generation; `tauri-specta` or `ts-rs` is the
   actual fix. Highest value of the four.
2. A frontend state manager for queue/timers/priority — **caution recorded**: Rust already
   owns queue, priority, TTL, preemption. A store would create a second source of truth.
   The genuine gap is choreography state, which is scattered across three files.
3. Zod for validation — good, but decide it with idea 1 or the schemas get written twice.
4. Own click/UI state in the UI — blocked by physics, not preference: the overlay window
   is click-through, so the webview receives no pointer events, which is why hover is a
   native tracking area in Rust. The best motivation for module 3.
