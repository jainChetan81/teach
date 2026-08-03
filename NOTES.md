# NOTES.md — teaching scratchpad

## User preferences (stated 2026-07-26)
- **HTML only** for anything he will read (plans, goals, lessons, reference). Markdown is for agent state only.
- **He studies in Claude Code** (`/teach` there), not on the Kimi platform. The workspace is self-contained — see CLAUDE.md.
- Folder must be `~/Desktop/teach` (iCloud-synced Desktop, available on all his devices).
- Structure he asked for (revised 2026-07-27): general goals at the top level (index.html), **one folder per subject at the root** (`teach/<subject>/` with plan + lessons + reference inside), growing over time. New subject → new root folder.
- Motivation is the historical failure point → single-sitting wins; when he stalls, shrink the step, never grow the plan.
- Enforce the two-active-subjects rule gently but firmly. Current active: **herdr, notchtap-tauri**. The user explicitly replaced ai-tooling on 2026-08-03.

## Confirmed identities (resolved 2026-07-26)
- **herdr** = ogulcancelik/herdr — Rust agent multiplexer; background session server holds PTYs, thin clients attach via Unix socket or SSH (`herdr --remote`). Docs: herdr.dev/docs (concepts, session state, remote).
- **t3code** = pingdotgg/t3code — minimal web GUI for coding agents; Effect/TS monorepo, provider-adapter pattern, SQLite session persistence. No Kimi provider yet → that's his spike (ai-11).

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
- Shared quiz widget now lives at `assets/quiz.js` (markup contract documented in the file).
  New lessons link it instead of inlining the handler; the four herdr lessons still inline
  their own copy and can be migrated whenever one is next edited.
