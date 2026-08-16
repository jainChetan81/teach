# 0010 — The Big Cleanup: planned, adversarially verified, merged

Date: 2026-08-16
Subjects touched: `notchtap-tauri` (active)

## What happened

The user planned and ran a full anti-slop cleanup of NotchTap on
`chore/anti-slop-cleanup`, merged to master as PR #20. Scope executed: weather, media/
now-playing, the secrets store, the connector framework, and reduced-motion support
removed; tabs 5 → 3; ~12.6k history comments and ~69k doc/plan lines deleted (188 plan
files collapsed into `plans/INDEX.md`); the anti-slop oxlint plugin taken from 369
findings to 0 and wired into CI + justfile; two prototype-unsafe lookup tables fixed; the
board-only expand gap fixed.

An unapproved-but-accepted extra landed too: a structure wave moving the eight hooks to
`src/hooks/` and shared helpers to `src/lib/` (Kharcha-inspired), with re-exports at the
old paths.

## The teaching-relevant part: plan review as a verification exercise

Before execution finished, we fanned out four read-only checker agents over ~30 claims in
the plan. Result: ~24 confirmed (many to the exact line), and five wrong in ways that
mattered:

1. "Weather already never spawns" — false; it spawns when the settings toggle is on
   (default off). Decision unchanged, risk framing corrected.
2. Command count after removals is 15, not 14 (no separate media command existed).
3. The "enter/o expand flag never driven" defect was misdiagnosed — the whole
   queue→wire→class chain works; the only gap was the Agent Board ignoring the flag
   (`App.tsx` passed hover-only). A blind "fix" could have broken working code.
4. Review logs: 20 files, not 22 (line total 7,074 was exact).
5. The 4.2 MB vendored tree was ~196 KB tracked; the rest was gitignored build output.

All five corrections were fed to the running agent mid-flight and landed (plan v5), plus
one gap we found ourselves: the `--media-mint` token would be orphaned by the media
removal — resolved before merge (token gone, `notchtap-tokens.css` kept empty as the
extension point, guard test inverted to assert absence).

Post-merge we re-ran every gate independently: vitest 748/748, tsc, biome, oxlint 0,
vite build, cargo test, clippy `-D warnings` — all green, tree clean, pushed.

## Standing lesson

Verify a plan's *claims* separately from its *decisions*. The decisions were all
defensible; five claims were wrong, and two of the wrong claims (the count assertion and
the misdiagnosed defect) were exactly the kind an executing agent trips on. Adversarial
claim-checking before/while executing is cheap insurance — this is the same habit as
[[0009]]'s "one missing module, not fifteen bugs" prior: check the shared premise first.

## Course impact (applied same day)

- The seven wires survived unchanged — lesson 0001 stays true. Wire table and frontend
  map re-verified with post-cleanup paths (`src/hooks/`) and line numbers.
- Reduced motion left the app, so the plan's nt-12 wording and a lesson 0001 quiz
  distractor were updated.
- Module 2 (nt-4, the real-defect list) is deferred by the user's choice — not running
  the app for now. Module 3 (Tauri boundary, reading-only) runs first; lesson 0002
  ("The two doors") written against the post-cleanup repo covers nt-8/nt-9 groundwork.
- Reduced-motion removal reverses a prior default assumption: the app no longer honors
  the OS accessibility switch. If NotchTap ever goes public, this comes back.
