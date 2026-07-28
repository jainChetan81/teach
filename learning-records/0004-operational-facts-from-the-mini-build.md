# 0004 — Operational herdr facts, measured during the mini/macbook build

Date: 2026-07-28
Subjects touched: `herdr` (active), `portable-sessions` (capstone)
Source: a real multi-hour build on the Mac mini and MacBook, not documentation reading.

## Why this record exists

Lessons 0001 and 0002 were built from herdr's docs. This record captures what was
**measured on the user's own machines**, including four facts that contradict what a
reasonable person would assume from the docs. All of it became lesson 0003.

## Capstone progress — real, tick it

- **ps-5 done.** `herdr --remote` works mini ↔ macbook in both directions over plain SSH keys.
- **ps-6 done.** Same over Tailscale: MagicDNS names, zero port forwarding, direct path
  measured at 6 ms.
  - **Caveat that must survive into the write-up:** both machines were on the same LAN
    (`192.168.68.0/24`) at measurement time. That is same-subnet direct, *not* proof of NAT
    traversal. The DERP-relay path — the interesting one — remains untested and cannot be
    tested from home.

## Facts that contradict the obvious assumption

1. **`herdr server restart` does not exist.** Only `stop`, `reload-config`, `live-handoff`.
   The dangerous failure mode: you want config applied, reach for "restart", find it
   missing, and substitute `server stop` — which kills every agent. `reload-config` returned
   `{"diagnostics":[],"status":"applied"}` with all three panes still alive.

2. **The server does not auto-start.** After `server stop`, `herdr session list` reports
   `stopped` and creates no socket. A client command will not revive it. Fixed with
   `~/Library/LaunchAgents/com.chetan.herdr-server.plist` using `RunAtLoad = true` plus
   `KeepAlive → SuccessfulExit = false`, so a crash restarts it but a deliberate stop stays
   stopped.

3. **`pane_history` saves far more than one screenful, and restore works.** Earlier notes
   said one screen, restore unproven. Measured across two clean shutdowns: 110 and 308 lines
   saved against a 40-row viewport. After a full stop/start, 59/90 and 201/286 saved lines
   returned verbatim. A later re-measure by a subagent found 47/118/316 against a 47-row
   viewport — the window had been resized, both are correct, the conclusion is unchanged.

4. **A pane running an agent restores the agent, not the screen.**
   `resume_agents_on_restore` relaunches it and the agent clears its own display. The agent
   session id survives. Do not read an empty agent pane as a restore failure.

## Two methodology traps worth teaching on their own

- **`--source visible` lies about restore.** It returns only the current viewport. It
  reported 0/18/19 lines across three panes while `--source recent --lines 400` found 127
  and 378. The feature was fine; the question was wrong.

- **Never test PATH from inside an already-fixed shell.** `zsh -c 'command -v mosh-server'`
  passed *before* anything was fixed, because it inherited a good PATH from its parent. Only
  `env -i HOME="$HOME" /bin/zsh -c '...'` asks honestly. This wasted real time.

## The PATH trap (the capstone's most likely killer)

Homebrew writes its `shellenv` line into `~/.zprofile`, which **only login shells read**.
`ssh host 'cmd'` runs non-interactive and non-login, so it reads `~/.zshenv` and nothing
else. Result: `/opt/homebrew/bin` missing, `herdr` and `mosh-server` "not found",
`herdr --remote` dead with an unhelpful error.

Hit on **both** machines. The MacBook had the line three times over, stacking PATH. Fixed by
moving it to `~/.zshenv` behind a `HOMEBREW_PREFIX` guard so nested shells don't re-prepend.

## Config precedence when attached remotely

herdr renders **server-side**. Attached from the MacBook to the mini, the *mini's*
`config.toml` governs theme, sidebar, toasts, sound. Exceptions: `kitty_graphics` is
client-side (needs the local terminal), `[keys]` bindings do not cross, plugins are
client-side. Never resolve a mismatch by copying one config over the other — the two
machines occupy different roles.

Concrete case: the mini's `auto_switch = true` let the *host* flip the MacBook's display to
a light theme, and the MacBook's own dark-forcing could not prevent it. Fixed by pinning
`auto_switch = false` on the host.

## Environment constraint for the capstone

FileVault is on with no auto-login, and `fdesetup authrestart` fails (error 11) on this
Apple M4 / macOS 26.5.2. After any reboot the mini sits at the disk-password screen: no
login, so no Tailscale, no LaunchAgent, no server, nothing to attach to. **Remote access
holds only while the host stays powered and logged in.** Any "portable sessions" design that
assumes the host survives a reboot unattended is wrong on this hardware.

## What changed in the workspace

- New: `herdr/lessons/0003-operating-the-server.html`
- `herdr/plan.html`: added `hdr-5` for lesson 0003 (id is 5, position is after `hdr-2`;
  existing ids were left alone so saved progress is not disturbed)
- `herdr/lessons/0002-*.html`: "next up" repointed — socket-API lesson moves to 0004
- `herdr/reference/herdr-cheatsheet.html`: added `reload-config`, `live-handoff`, the
  `pane read --source` distinction, and a warning on `server stop`
- `portable-sessions/plan.html`: `ps-5` and `ps-6` annotated as done, with the same-LAN caveat

## Still open

- Lesson 0004 (socket API by hand) — promised in 0002, not yet written.
- `experimental.kitty_graphics` effect still unproven. It is client-side, so it needs an
  image rendered in a pane from whichever machine you are sitting at.
- NAT-traversal / DERP path untested; needs the MacBook off the home network.
