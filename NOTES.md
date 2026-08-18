# NOTES.md — teaching scratchpad

## User preferences (stated 2026-07-26)
- **HTML only** for anything he will read (plans, goals, lessons, reference). Markdown is for agent state only.
- **He studies in Claude Code** (`/teach` there), not on the Kimi platform. The workspace is self-contained — see CLAUDE.md.
- Folder must be `~/Desktop/teach` (iCloud-synced Desktop, available on all his devices).
- Structure he asked for (revised 2026-07-27): general goals at the top level (index.html), **one folder per subject at the root** (`teach/<subject>/` with plan + lessons + reference inside), growing over time. New subject → new root folder.
- Motivation is the historical failure point → single-sitting wins; when he stalls, shrink the step, never grow the plan.
- Enforce the two-active-subjects rule gently but firmly. Current active: **herdr, notchtap-tauri**. The user explicitly replaced ai-tooling on 2026-08-03.

## Confirmed identities (resolved 2026-07-26)
- **herdr** = herdrdev/herdr — Rust agent multiplexer; background session server holds PTYs, thin clients attach via Unix socket or SSH (`herdr --remote`). Docs: herdr.dev/docs (concepts, session state, remote).
- **t3code** = pingdotgg/t3code — minimal web GUI for coding agents; Effect/TS monorepo, provider-adapter pattern, event-sourced session store (SQL transaction per event — confirm "SQLite" specifically from source, public docs don't name the engine). No Kimi provider yet → that's his spike (ai-11). Already ships Tailscale pairing + SSH-launch remote access — not an open design question.

## The through-line
Capstone: portable agent sessions (`portable-sessions/`). herdr's model (server-owned
PTYs, disposable clients) vs t3code's model (SQLite event store, reconnecting UI). The
user's goal: move a live session between devices over SSH/Tailscale and port herdr's
"formula" to t3code. All four named concepts (rust, tauri/t3code, herdr, ssh/tailscale)
exist to serve this.

## Open items
- **Rename the mini's account `chetanjain` → `chetan`** so all three machines match.
  User's call, deliberately deferred: "who knows what we will break." Renaming a macOS
  account touches the home dir path, keys, LaunchAgents and herdr's `~/.config` — do not
  do this casually, and not while the capstone depends on the mini working.
- **RESOLVED, in two steps (2026-07-30).** First he said "just checked it is mosh", then
  clarified he *does* use an iOS app, on its **free tier**, whose limit is **2 saved remote
  connections** — "a latter problem for sure". So the real picture: `mosh` the free OSS CLI
  on the MacBook, **plus** a free-tier iOS app (almost certainly Moshi, below) on the phone.
  **He is paying nothing today.** The only live constraint is 2 saved connections, and he
  has 4 tailnet nodes — so this bites the day he wants mini + macbook + vps + anything else
  saved at once. Whatever "issues" he mentioned are still undescribed; first suspect remains
  the `mosh-server` PATH trap from record 0004. App details:
- *Moshi: SSH & MOSH Terminal*, FrontierOne Software,
  App Store id `6757859949`, v3.10.1, iOS 18+. Free download, subscription for Pro. India
  tiers seen: Founder ₹399/mo, Pioneer ₹499/mo, Pro ₹699–799/mo, Pro Yearly ₹5,900–6,900,
  **Pro Lifetime ₹12,400**. Rated 5.0 from only **7** raters — too few to mean anything.
  Explicitly built for Claude Code / Codex; bundles voice-to-terminal (on-device Whisper),
  Face ID for SSH keys, and *webhook push alerts* — i.e. it already does the hark job.
  Alternatives if it disappoints: Blink Shell, Echo (SSH + Mosh), Secure ShellFish, Prompt 3.
  **Still unknown: what its "issues" actually are.** User has not described them.
  Key distinction to keep repeating: `mosh` (free, OSS, on the Mac) ≠ Moshi (paid iOS app
  that speaks mosh). There is no way to run mosh on iOS *without* some app.
- **hark parked.** It's a webhook→iPhone-notification SaaS (see record 0005), not a
  harness. User: "cannot see its usecase, I will pick this up later." Revisit only if an
  agent ever needs to ping the phone for approval.
- kharcha go/no-go deferred to a learning record per llm-5.
- Progress checkboxes use browser localStorage — per-device. If cross-device progress matters, commit progress snapshots to git instead (discuss before building).

## Observations for future sessions
- herdr **0.7.5** is installed and in real use (`~/.config/herdr` has a live `session.json`,
  sockets and server logs). Ground herdr lessons in commands he can run on his own machine
  rather than in hypotheticals — see learning record 0003.
- His three prior PDFs are well-structured (phases + verification checkpoints). Failure mode is starting, not planning. Keep momentum artifacts visible.
- **2026-07-30 — the pattern showed up here.** Four lessons written, zero read. He noticed
  it himself: "I have not even started on lesson 01, now just everything but adding stuff
  to it." **Do not write lesson 0005 until 0001 is ticked.** When he asks a good question
  mid-session, answer it in chat and log it in a learning record — resist turning every
  answer into new material. Building the course is the comfortable substitute for taking it.
- He types fast and informally; don't over-index on typos — confirm tool identities before building lessons around them (done for herdr/t3code).
- **NotchTap identity confirmed.** The app repo is `~/Desktop/code/mac-notification-nudge`, with remote `jainChetan81/notchtap`. Do not create a duplicate app repo inside `teach`.
- **NotchTap teaching order:** frontend map, one frontend-only UI fix, Tauri events and commands, then cross-boundary UI fixes. Use the user's visible problems as the syllabus.
- **2026-08-03 — the NotchTap goal is sharper than "learn Tauri."** He wants to stop
  handing animation bugs to AI and fix them himself (record 0007). Lesson 0001 (the seven
  wires) is written and delivers the data path plus the three animation triggers. **Do not
  write lesson 0002 until he has named at least one real UI defect (`nt-4`).** The next
  lesson must be built on his own bug, otherwise it is generic material and repeats the
  four-lessons-zero-read failure.
- **Idea capture is a standing job (2026-08-03).** He thinks out loud constantly and asked
  for his thoughts to be recorded. NotchTap thoughts go to `notchtap-tauri/ideas.html`
  (status + honest take per idea). Write them down the moment he says them; never silently
  turn one into work. If another subject starts collecting thoughts, give it its own
  `ideas.html` rather than a shared file.
- **His animation focus is the state ladder, not one bug:** idle / minimal / compact /
  expanded, how each section moves between them, plus settings-panel UI fixes. His four
  words map to real code as `bare`, no-class idle, showing-not-expanded, and `expanded` —
  with four unnamed extras (`promoting`, `exiting`, `exit-to-bare`, `hovered`). That
  mapping is the spine of lesson 0002.
- Shared quiz widget now lives at `assets/quiz.js` (markup contract documented in the file).
  New lessons link it instead of inlining the handler; the four herdr lessons still inline
  their own copy and can be migrated whenever one is next edited.
- **2026-08-15 — his NotchTap goal is broader than animations.** He stated it plainly: the
  goal is to understand the **entire application** — high-level architecture first, what
  happens when he opens the app or clicks a button, frontend AND backend (Rust side at a
  high level, since the frontend is his home turf). Animations are one slice; the real
  syllabus is whole-app mental model, then fixing. Keep each lesson in the zone between
  whole-app overview and one concrete mechanism, and keep framing what each file does in
  the whole.
- **2026-08-15 — his actual gap is the WHOLE codebase, front included.** Correction to the
  previous note: he is an "okay" frontend engineer, and the wipe of AI-generated code is
  the problem — every line in this repo was written by AI, so he does not know how ANY of
  it works, front or back. Animation is NOT a solved district; the animations are broken
  and he still has to fix them, but the fixes only come after he understands how the
  pieces work. So: the ZPD is the entire app-specific codebase, back-to-front. Lesson 0001
  and the wire table are still the right entry (the message surface is the spine), but plan
  for thorough exposition of the app's own code — the repo is more foreign territory than
  "just the Tauri boundary". Order: understand how it all works first, fix things second,
  no exceptions.
- **2026-08-16 — first real defect candidate, unprompted: hover feels flaky.** He said the
  hover "was working a bit weird for me" and called the rust-side click/hover decision
  possibly wrong. This is the FIRST concrete nt-4 item — do not lose it. Not yet pinned
  down (no repro, no expected-vs-actual). When he opens the app, start here.
- **2026-08-16 — no history in teaching pages.** Same rule he gave his repo now applies to
  this workspace: lessons, plans, and reference pages describe the CURRENT repo only — no
  "re-verified <date>" trails, no "after the Big Cleanup" framing, no what-changed
  callouts. History lives in learning-records/ (and this file). ideas.html keeps its
  dated-log format by design.
- **2026-08-16 — post-cleanup resequencing.** The Big Cleanup merged (see learning record
  0010). He is NOT running the app for now and will bring the nt-4 issue list "later, when
  in the mood" — do not push it. Module 3 (Tauri boundary, reading-only) runs first;
  lesson 0002 written for it. When he brings issues, module 2 resumes.
- **2026-08-16 — window names he chose:** call the overlay window "the Notch" and the
  settings window "the settings panel". Use these names in lessons and chat instead of
  index.html/settings.html or overlay/settings-webview.
- **2026-08-16 — pace generic frontend tasks fast.** He cleared nt-2 (two Vite entries +
  root components) in ~3 minutes and said so: "I am a 5-year experienced front-end
  engineer. I can tell these things very easily." Generic React/Vite/tooling recognition
  tasks are NOT his ZPD — compress or fold them into app-specific tracing. Time estimates
  on plan items should assume senior-frontend speed for anything framework-shaped; keep
  full sitting sizes only for app-specific wiring and the Rust/Tauri side.
- **2026-08-15 — plan chosen: A (whole-app understanding first).** He picked "understand
  the whole app" as the first mode: sequence through how each layer works (boot → Rust →
  wires → React render), fixes come later, and he'll read how he feels at each sitting to
  decide when to switch modes. Don't push fixes until he asks.
- **2026-08-15 — architecture opinions to respect (stated while reading lesson 0001):**
  (a) he prefers one funnel in, everything fans out — everything should be an internal
  plugin, forever scalable; note this for any future restructure discussion; (b) he leans
  toward "an event fires, happens, dies" (command semantics) and distrusts the repo's
  compare-with-last dedup (state-sync semantics) — but the two are different paradigms,
  the app is deliberately state-sync, don't let him "fix" it into command semantics
  without understanding the trade; (c) he'd rather use Zod than hand-rolled validators —
  legitimate, but hand-rolled reject-or-empty exists to avoid a webview dependency; worth
  discussing, not an automatic win.
- **2026-08-15 — lesson 0001 staleness RESOLVED same day.** The `useSlotState.ts` deletion
  turned out to be an accident, not a refactor: the file was restored unchanged via
  `git restore`, all seven `listen<` calls are back, and every wire-table row was
  re-verified against the live repo (`useSlotState.ts:261` listens for `slot-state`;
  boot seed read at `:251`). Lesson 0001 and the wire table are accurate again. Real
  intentional changes from the same day (new `src/notchtap-tokens.css`, OpenCode 1.18
  adapter export shape, condensed CLAUDE.md, `docs/FIGMA_DESIGN_SYSTEM.md`, root
  `unified.html`) are recorded in learning record 0009 and in a dated callout on
  `notchtap-tauri/plan.html`. The lesson-0002 gate is unchanged: wait for a named defect
  (`nt-4`), per the 0001-read note above.
