# 0012 — The fourteen issues are one issue: there is no state machine

Date: 2026-08-19
Subjects touched: `notchtap-tauri` (active)

## What happened

Four read-only agents were fanned out over the live app repo. Three re-verified the teaching
pages (see 0011's sibling commit `809c599`); the fourth mapped every visual state, timer,
size constant and mode gate in the overlay.

The fourth report changed the shape of the work. The rebuild plan is now
`notchtap-tauri/rebuild-plan.html`, published at https://uonlg67ztqfp.postplan.dev.

## The finding that reframes everything

`src/hooks/useExitChoreography.ts` takes three inputs and returns **eleven** independent
booleans. `StatusRailCard.tsx:419-457` joins eight of them into a class string with
`.filter(Boolean).join(" ")`.

Nothing enforces mutual exclusion. The invariants are held in *comments*:

- "`.promoting` and `.exiting` never coexist" — true only because `setPromoting` is called
  synchronously in the render body at line 296. Move it into an effect and the guarantee
  disappears with no error.
- "`exitToBare` is only ever paired with `exiting`" — true by derivation, re-asserted in
  prose rather than expressed in a type.

So the fourteen logged issues are not fourteen bugs. They are what a contradictory state
space looks like from the outside.

## Three root causes found, not guessed

1. **i-13, the off-centre idle face.** `StatusRailCard.tsx:681` wraps `IdleFace` in
   `<div className="rest-cluster">`. **There is no `.rest-cluster` rule in the repository.**
   The string appears in exactly one file — the one using it. A seven-line comment above it
   describes the missing rule and calls the shipped version "authoritative". The wrapper
   auto-places into the first free grid cell, which is the one `.flank-right` claims
   (`card-chrome.css:206`).

2. **i-5, the agent board churn.** Three causes stacked: `dedup_eq` (`model.rs:403`)
   compares `summary`/`details`, and `claude_code.rs:133` rewrites both on every
   `PostToolUse`, so every tool call emits; `AgentBoard.tsx:43` runs a 1 Hz tick whenever any
   session is under 60s in state, and `registry.rs:281` resets that age on every transition;
   every row carries `layout="position"` (`AgentBoard.tsx:263`) so motion re-measures all of
   them on each render.

3. **i-1 and i-7, the oversized idle.** 370×32. That is a 200px cutout plus an **85px floor**
   per flank, applied whether or not the flank holds anything. The 85 is hand-duplicated at
   `card-chrome.css:73`, `card-chrome.css:259`, and `hover.rs:25`.

## The teaching-relevant part

**A comment is not a guarantee.** Three separate findings this session were comments that
described code which does not exist, or code that no longer exists: the `.rest-cluster`
rule, the "eq bars" in rest, and `useExitChoreography.ts:43-44` defending a version of
`App.tsx` that has since changed. In every case the comment was more confident than the
code. The general rule: **when a comment and the code disagree, the comment is the one
that rotted.** Comments are not compiled, so nothing checks them.

**Booleans multiply, states do not.** Eight booleans is 256 combinations. The app has maybe
a dozen real states. The other 244 are unreachable-by-luck, not unreachable-by-construction.
Replacing them with one value that can only hold one case at a time is the difference
between "we are careful" and "it cannot happen".

**Duplicated constants are a coupling you cannot see.** The 85, the 200, the 32, the 210 and
the 500 each exist in two or three files kept equal by hand. The codebase knows this and
guards it with parity tests (`stripGeometryParity.test.ts`, `animationTiming.test.ts`, a
`#[cfg(test)]` check in `hover.rs`). That is the right instinct applied to the wrong problem:
a test that catches drift is strictly worse than one source both sides read.

**Naming collisions cost more than bad names.** Three unrelated concepts — hardware notch
detection, the user's resting-state preference, and the "draw nothing" flag — are all called
some form of "notch". In `App.tsx` the identifier `mode` means two different things in one
file. This is why the survey was needed at all: no amount of reading fixes a vocabulary that
overloads itself.

## Decisions

- The rebuild runs in seven stages, each ending green. Stage 0 is three free wins; Stage 1 is
  the state machine; the rest is downstream.
- Module 3 (the Tauri boundary, steps 8-10) still comes before any building.
- The chat shorthand `nt-8` is retired. Plan items are referred to by "step N" plus their
  words, in the pages and in conversation.

## Open, and blocking

Two product decisions, both mine to make and neither answerable from code:

1. Should the agent card's text change on every tool call? Calm, or live?
2. Which display wins: the mouse's, the focused app's, or one card per screen?
