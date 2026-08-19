# 0011 — The issue hunt is closed; the track pivots to the rebuild

Date: 2026-08-19
Subjects touched: `notchtap-tauri` (active)

## What happened

The user ran the app from the latest build and reported another round of problems: the
idle face sitting off centre, an expanded panel that is nearly empty apart from a stray
line, and a tray menu whose silence state he could not read. He also ran a second
anti-slop pass on the app repo (`7645a73`, `4009adf`).

Five more issues were logged (`i-10` … `i-14`) with three of them confirmed against the
code, taking `notchtap-tauri/issues.html` to fourteen.

Then he called it: **stop hunting, start building.** The states are being rebuilt on both
sides, so more issues found in code that is about to be replaced buy nothing.

## What the code actually said

Three of the five were confirmed, not guessed:

1. **The tray status reads as a broken button.** `tray.rs:63` `silence_indicator_label`
   returns "Silenced" / "Not Silenced", rendered by `build_tray` (`tray.rs:231`) as a
   menu item created with `enabled = false`. macOS greys disabled items, so the one row
   that answers "am I silenced?" is the row that looks least clickable, sitting in the
   same unseparated run as four real actions.

2. **Two indicators, one owner missing.** `set_silence_indicators` (`tray.rs:84`) writes
   both the menu text and the menu-bar moon glyph. `build_tray` writes only the text.
   The glyph is first written by `spawn_silence_task` (`lib.rs:872`), spawned after the
   tray is built (`lib.rs:677`).

3. **Quiet hours are boot-only.** `SilenceController::new(schedule_enabled, window)` is
   called once at `lib.rs:351`. The type exposes `is_silenced`, `start_mute`,
   `cancel_mute`, `skip_current_window`, `next_boundary` — and no schedule setter. The
   background task also sleeps to the *old* schedule's `next_boundary`, so a setter alone
   would not be enough.

## The teaching-relevant part

**An issue log has a shelf life.** Its value is highest when the code under it is stable
and you are choosing what to fix. The moment the decision becomes "rebuild", the log
stops being a to-do list and becomes an **acceptance list**: the things the rebuild has
to come out true against. Continuing to add to it after that point is motion, not
progress. `issues.html` now carries a banner saying exactly this.

**Grey means unavailable, not "false".** i-10 is a small, general interface lesson: state
and action want different visual channels. Reusing a disabled action to display a state
is why the user could look straight at the answer and still not know it.

**Read-once configuration is a whole class of bug.** i-12 is not "the silence feature is
broken". It is "this value is read at boot and never again". That shape repeats across
codebases, and the fix is always the same three pieces: a setter, a wake signal for
anything sleeping on the old value, and a call site on the save path.

## Decisions

- `nt-4` (record the issues) is complete. Fourteen issues, eight screenshots.
- No more issue hunting on the current build.
- The track moves to Module 3, the Tauri boundary, ahead of Module 2's repair loop —
  because a rebuild crosses that boundary and a patch does not.

## Open

- i-6 still needs the reference-app link.
- Which display should win for i-8 is still undecided, and is a product call.
