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
- kharcha go/no-go deferred to a learning record per llm-5.
- Progress checkboxes use browser localStorage — per-device. If cross-device progress matters, commit progress snapshots to git instead (discuss before building).

## Observations for future sessions
- His three prior PDFs are well-structured (phases + verification checkpoints). Failure mode is starting, not planning. Keep momentum artifacts visible.
- He types fast and informally; don't over-index on typos — confirm tool identities before building lessons around them (done for herdr/t3code).
