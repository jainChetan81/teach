# 0009 — A deleted wire, restored, plus five real repo changes

Date: 2026-08-15
Subjects touched: `notchtap-tauri` (active)

## The incident: one missing file, fifteen screaming importers

`src/useSlotState.ts` — the React hook that listens for `slot-state`, the seventh wire,
emitted from `src-tauri/src/engine.rs` via `emit_slot_state` — was accidentally deleted
from the working tree while roughly 15 files still imported it. The build broke with a
cascade of TypeScript errors across the import graph. `rg -n 'listen<' src` returned six
lines instead of seven, which is what first exposed the hole (NOTES.md briefly declared
lesson 0001 stale over it).

It was restored **unchanged** via `git restore`. Re-verified against the live repo after
the restore:

- Seven `listen<` calls again; `useSlotState.ts:261` listens for `slot-state`.
- The boot-seed read of `window.__NOTCHTAP_SLOT_STATE__` sits at `useSlotState.ts:251`.
- Every row of `notchtap-tauri/reference/wire-table.html` matches reality; no rewrite
  needed, only the re-verification date.

## The teaching value of the incident

This is the cleanest possible case study for a debugging habit worth keeping: when the
compiler reports errors in fifteen files at once, the prior should be **one missing or
broken module**, not fifteen independent bugs. Read the error list for the shared import
before touching any of the fifteen. It also shows why the lesson's "prove the list is
complete" ritual (`rg -n 'listen<' src`) earns its place — a count that should be seven
coming back six is a one-line tripwire for exactly this failure.

## Five intentional changes, same day (these ARE real)

1. **New `src/notchtap-tokens.css`** — app-only design tokens, currently just
   `--media-mint` (the media accent, `oklch(0.923 0.067 177.33)` / `#b6f5e5`). It was
   REMOVED from `vendor/shared-ui/design/tokens.css` and now lives only here. Load order
   is load-bearing: shared `tokens.css` first, then this file, in both UI entries —
   `src/main.tsx` (overlay) and `src/settings/base.css` (settings, lines 57–58).
   `src/entryImportOrder.test.ts` gained tests that fail CI if the order drifts.
2. **`adapters/opencode/notchtap.ts`** changed its export shape for OpenCode 1.18:
   `export const server = NotchtapPlugin` plus
   `export default { id: "notchtap", server }`.
3. **Root `CLAUDE.md` condensed** — same content, telegraphic style.
4. **New `docs/FIGMA_DESIGN_SYSTEM.md`** — documents two Figma files mirroring the code
   tokens; code is the authority, Figma downstream. Its 2026-08-08 audit already records
   `media-mint` as "correctly absent" from shared-ui and present in the notchtap file,
   i.e. Figma anticipated the token split now enforced in code.
5. **New `unified.html` at the repo root** — a large unified control/prototype/research
   reference document, not wired into the build.

## What changed in the teach workspace

- `notchtap-tauri/plan.html`: dated "What changed in the repo — 2026-08-15" callout
  listing the incident and all five changes with file paths to inspect.
- `notchtap-tauri/reference/wire-table.html`: re-verified date, plus a note under the
  completeness check recording the day the count briefly read six.
- `notchtap-tauri/reference/frontend-map.html`: new "App-only design tokens" row for
  `src/notchtap-tokens.css` in the overlay-responsibility table.
- `NOTES.md`: the "lesson 0001 is STALE" alarm replaced with the resolution.

## Standing constraints re-confirmed

- Lesson 0002 stays gated on a named real defect (`nt-4`). Nothing today changes that.
- The wire mapping needed verification, not rewriting — the restore made the old table
  true again. Resist "fixing" documentation to match a transient broken state.
