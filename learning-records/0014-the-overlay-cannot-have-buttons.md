# 0014 — The reference's buttons are the one thing NotchTap architecturally cannot do

Date: 2026-08-19
Subjects touched: `notchtap-tauri` (active)

## What happened

Two final reference screenshots (`nt4-12`, `nt4-13`) closed the i-6 comparison: the finished
state. Resting is the same pill with the word "Done" and a final elapsed time. Hovered adds a
footer bar with a status line and two buttons, **Open in T3 Code** and **Dismiss**.

The planning phase closed here. The user's stated sequence: understand, then design, then
reach a starting line, then build, with UI work last.

## The finding

Everything in the reference screenshots is drawing, except the footer. Those buttons act.

**NotchTap's overlay window has no permission to call Rust at all.** Its capability file
grants exactly two permissions, both of them "listen for messages", and zero commands.
`build.rs` opts app commands into deny-by-default so this is enforced rather than conventional
(verified in lesson 0002's re-check, `abc0404b`).

NotchTap already lives with this. Its icon strip's React click handler is a deliberate empty
function — `const noopSelect = (_tab: Tab): void => {}` at `StatusRailCard.tsx:116`, passed at
`:728`. The real click is caught by a system-wide native mouse monitor in
`src-tauri/src/click.rs` (201 lines), which maps screen coordinates onto hit-test rectangles
and decides the target in Rust. Rust then tells the UI what happened over an event.

## The teaching-relevant part

**A security boundary sets a price on every future feature.** The overlay cannot be tricked
into calling into Rust because it has no way to call into Rust. That is a real and defensible
position. But it means every interactive element in the overlay costs a native hit-test
rectangle in Rust, kept in agreement with a CSS rule by hand — the same hand-duplicated-number
problem already documented for the 85/200/32 constants. A panel with two buttons on it is not
two buttons; it is two rectangles in `hover.rs` plus two CSS rules plus a parity test.

**Know the boundary before designing against it.** This is the strongest possible argument for
doing Module 3 (steps 8-10, the Tauri boundary) before any design work. A design that assumes
web-style buttons would be drawn, approved, and only then discovered to be expensive.

**"Re-architect everything" was the wrong size, and saying so mattered.** The honest split:
the Rust backend (~10k lines: queue, pollers, HTTP, config, history, settings) does not know
the overlay exists and is untouched. The message wiring is verified sound and deliberately
locked. **One layer is genuinely wrong** — the overlay's state layer, four files. Everything
else is downstream of it or fine. Calling that "rebuilding the application" would have
justified a scope nobody needs.

## Decisions

- Planning is closed. Next is learning: the Tauri boundary, steps 8, 9 and 10.
- Only the promoted tier may carry actions, since actions are the expensive part.
- Progress percentage, rings, and other reference features are explicitly deferred. The user's
  words: "we will keep adding these things".

## The sequence the user set, in his own order

1. Understand how it works.
2. Redesign and restructure the backend the way he wants it.
3. Get to a starting line he can build from.
4. Then the UI work.

The teaching track should follow that order, not jump to the visible part.
