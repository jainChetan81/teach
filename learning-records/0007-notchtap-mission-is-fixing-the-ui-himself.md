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

## Open

He has not yet named a specific UI defect. `nt-4` (capture the issues, with recordings)
is the real gate for lesson 0002 — the next lesson must be built on one of his own bugs,
not on a generic animation topic.
