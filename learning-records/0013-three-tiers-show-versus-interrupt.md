# 0013 — Show and interrupt are two decisions, not one

Date: 2026-08-19
Subjects touched: `notchtap-tauri` (active)

## What happened

Both blocking product decisions from the rebuild plan were answered, and the reference
implementation (i-6) finally got its screenshots. The plan was rewritten around them and
re-published (Postplan draft `uonlg67ztqfp`, version 2).

**Agent board:** live progress is wanted, but only where the user is looking. Detail on
hover, a still surface at rest, and taking over the screen reserved for finishing or needing
the user.

**Multiple displays:** dropped. One display for now. i-8 marked deferred on purpose, with
the reason recorded so it does not get re-litigated.

## The reference, now documented

Three screenshots (`nt4-09`, `nt4-10`, `nt4-11`) pin the target:

- Resting, nothing running: a pill in the cutout. Glyph + "Idle". Nothing else.
- Resting, one agent working: the *same pill*, same size, same place. Glyph + "Working" +
  elapsed time on the right. Tool calls do not move it.
- Hovered: a panel whose header **is that same pill, unchanged**, with project, title, model,
  machine, OS, start time, elapsed, branch, a progress ring, a state chip, and a live
  activity feed below it.

## The teaching-relevant part

**Displaying something and interrupting someone are separate decisions.** NotchTap fused
them, so the only way to make a tool call visible was to make it disruptive, and the only way
to stop the disruption was to hide the information. Once you split them, both problems
dissolve at once: the detail can be arbitrarily busy, because it only exists while the user
is deliberately pointing at it. This is the actual content of the user's answer, and it is a
general interface principle, not a NotchTap fact.

**Stillness is about shape, not about update rate.** My first draft of Stage 3 said "run the
per-second clock only while hovered". The reference disproves that: it counts seconds at rest
and still reads as calm. What makes it calm is that the *pill never changes shape* — same
height, same position, one word swapped, a timer appearing in space already reserved for it.
One number changing is not motion. Re-rendering and re-measuring a list is. The plan was
corrected; the original framing confused "cheap" with "quiet".

**A stable anchor is what makes reveal feel non-disruptive.** The hovered panel repeats the
resting pill as its own header. So the thing the eye was already fixed on does not move when
the detail arrives; the detail arrives *underneath* it. Anything that moves the anchor makes
a reveal feel like an interruption regardless of how fast or smooth it is.

**Deferring is a decision that must be written down.** i-8 was not dropped, it was decided
against, with the reason. An undocumented deferral gets rediscovered as a bug and re-costed
every few weeks.

## Decisions

- Stage 3 of the rebuild is now "three tiers, not one surface", with a per-tier content spec
  taken from the reference rather than invented.
- Stage 4.1 is settled: drop the 85px flank floor; the resting pill must be identical in size
  across every resting state.
- Stage 5 shrank to the silence-schedule setter alone.
- Rust keeps sending every update. The frontend decides what to paint. Throttling at the
  source would starve the hovered tier, which is the one place the user wants everything.

## Open

- The visual design of the tiers is deliberately not decided yet. The user's words: "we can
  have a better UI later on". The plan fixes behaviour and anatomy, not looks.
