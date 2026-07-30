# NOTES.md — teaching scratchpad

## User preferences (stated 2026-07-26)
- **HTML only** for anything he will read (plans, goals, lessons, reference). Markdown is for agent state only.
- **He studies in Claude Code** (`/teach` there), not on the Kimi platform. The workspace is self-contained — see CLAUDE.md.
- Folder must be `~/Desktop/teach` (iCloud-synced Desktop, available on all his devices).
- Structure he asked for (revised 2026-07-27): general goals at the top level (index.html), **one folder per subject at the root** (`teach/<subject>/` with plan + lessons + reference inside), growing over time. New subject → new root folder.
- Motivation is the historical failure point → single-sitting wins; when he stalls, shrink the step, never grow the plan.
- Enforce the two-active-subjects rule gently but firmly. Current active: **herdr, ai-tooling** (rust-tauri moved to queued when herdr became the first subject).

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
- **RESOLVED (2026-07-30): he is using plain `mosh`, not Moshi.** User checked. So the
  "it's paid and has issues" premise was wrong on the paid half — the mosh CLI on the
  MacBook is free and open source, no account, no subscription. Nothing to cancel, nothing
  to migrate off. Whatever "issues" he hit are mosh issues (most likely the `mosh-server`
  PATH trap from record 0004) and still undescribed. **The phone leg does not exist yet** —
  there is no way to run mosh on iOS without some app, so if he ever wants the iPhone in
  the loop, that is a new decision. Reference for that day, not a current tool:
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
- He types fast and informally; don't over-index on typos — confirm tool identities before building lessons around them (done for herdr/t3code).
