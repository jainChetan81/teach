# 0003 — herdr's persistence is five mechanisms, not one

**Date:** 2026-07-28
**Subject:** herdr · feeds portable-sessions ps-1
**Source:** herdr.dev/docs (concepts, session state, socket API) + the user's own
`~/.config/herdr` on this Mac (herdr 0.7.5).

## The finding

"Persistent session" in herdr is five separate mechanisms with different guarantees:

1. **Client death** — nothing was stopped, so nothing is restored.
2. **Detach (`ctrl+b q`)** — same mechanism, deliberate. Live persistence.
3. **Snapshot restore** — after a server restart, `session.json` rebuilds workspaces,
   tabs, panes, cwd, layout and focus. Fresh shells. Processes gone.
4. **Pane screen history replay** — experimental, **off by default**
   (`session-history.json`); disabled because scrollback contains secrets/tokens.
5. **Native agent session restore** — herdr stores the agent's own session reference and
   asks the agent to resume; requires a minimum integration version per agent
   (Claude Code, Copilot, …).

Plus **live handoff** (`herdr update --handoff`, experimental): running panes migrate to
the replacement server during a self-update.

One sentence: **herdr keeps processes alive by never stopping them; everything else is
reconstruction from notes.**

## Verified on the user's machine

- `~/.config/herdr/` holds `config.toml`, `session.json`, `herdr.sock`,
  `herdr-client.sock`, `herdr-server.log`, `herdr-client.log`.
- `session.json` (~1.4 KB) is pure layout: `version`, `workspaces[] {id, identity_cwd,
  tabs[], active_tab, pane numbering}`, `active`, `selected`, sidebar geometry. No output,
  no process, no agent memory. Good concrete proof of rung 3.
- CLI confirms: `herdr status`, `herdr api snapshot`, `herdr api schema`,
  `herdr server stop`, `herdr --session <name>`, `herdr --remote <ssh-target>`,
  `herdr update --handoff`.
- Socket API: newline-delimited JSON, `~/.config/herdr/herdr.sock` (named sessions:
  `~/.config/herdr/sessions/<name>/herdr.sock`).

## Why it matters for the capstone

t3code lives permanently at rungs 4–5: SQLite holds the transcript and the conversation
resumes, but there is no long-lived PTY to protect. herdr protects the process; t3code
protects the conversation. **The open design question for ps-1: which one does the user's
portable session actually need?** Deliberately left unanswered in lesson 0002 so he
answers it himself.

## Teaching state

- Lesson 0002 `herdr/lessons/0002-what-actually-survives.html` covers hdr-2 (replaces the
  old "read the docs" item).
- Quiz/diagram CSS moved from lesson 0001's inline `<style>` into `assets/style.css`,
  plus a new `ol.ladder` component. New lessons should not inline CSS.
- Next lesson (0003): drive the socket API by hand — raw ndjson `ping`, then
  `herdr pane read`. That's the bridge to ps-3 and to reading the Rust source.
