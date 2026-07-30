# 0005 — The connection ladder, and what hark actually is

Date: 2026-07-30
Subjects touched: `herdr` (active), `networking` (queued), `portable-sessions` (capstone)
Source: user's own five connect commands + live inspection of the mini + hark.ryan.ceo docs.

## Why this record exists

The user listed five commands he uses to reach the mini and said he did not know the
difference between them, or how mosh is even set up. He also asked whether hark
(https://hark.ryan.ceo/docs) is a self-hostable harness he could build his own version of.
One of those two premises was wrong, and the correction matters.

## Measured on the machine (not assumed)

- Tailnet is **`bullhead-mine.ts.net`**. Four nodes: `mini` (100.68.119.127),
  `macbook` (100.85.87.79), `contabo-vps` (100.80.41.44), `iphone` (100.127.148.76).
  **There is already a VPS on the tailnet** — the "always-on herdr host" option in the
  capstone is not hypothetical, the hardware exists.
- `mosh` and `mosh-server` are present at `/opt/homebrew/bin/`. Mosh itself is free and
  open source. Anything charging money is the phone terminal app, not mosh.
- `~/.ssh/config` on the mini has `Host macbook` and `Host contabo-vps` blocks, both
  pointing at `*.bullhead-mine.ts.net` with `id_ed25519_tailscale`.
- **Usernames differ per machine**: mini = `chetanjain`, macbook = `hackerearth467`,
  vps = `chetan`. This is why a mistyped `mosh chetjain@mini` fails with a permission
  error rather than a useful one, and the argument for `User` lines in `Host` blocks.

## The model taught (lesson 0004)

Three layers, not five alternatives. Every connect command answers all three:

| Layer | Question | Options in play |
|---|---|---|
| Address | which machine, named how | LAN IP · MagicDNS name · ssh alias |
| Transport | how bytes travel | ssh (TCP) · mosh (UDP) |
| Attachment | shell or session | plain shell · `herdr` |

The load-bearing insight: **mosh and herdr solve different halves of the same problem.**
Mosh keeps the *connection* alive across a network change; herdr keeps the *work* alive
across a client death. Neither substitutes for the other. Together they cover lid-close,
Wi-Fi→cellular, and killed-terminal. Neither covers a host reboot — see record 0004,
FileVault.

## Correction: hark is not what it looked like

`hark.ryan.ceo` is **"Webhooks to iPhone Notifications"** — a hosted SaaS that turns HTTP
POSTs into iOS push notifications and Live Activities, with a `harkctl` CLI (Node 22+).
Free tier 10k notifications/month, 1 device. It is **not self-hostable** and **not a
terminal or agent harness**. Useful adjacent to the capstone (an agent could ping the phone
when it needs approval), irrelevant as a session-portability tool.

The user's underlying question — "can I self-host my own harness?" — is still a yes, but
the answer is the capstone itself, not hark.

## Placement decision (open, user must choose)

Deep SSH/WireGuard/VPS theory belongs to the `networking/` track, whose objectives already
name `~/.ssh/config`, port forwarding, DERP relays and VPS hardening. But networking is
**queued**, and the two-active rule is herdr + ai-tooling. Resolution taken for now: teach
the *practical ladder* inside herdr (it blocks the capstone), leave the theory to
networking when it activates. Flagged to the user rather than decided silently.

## What changed in the workspace

- New: `herdr/lessons/0004-five-ways-in.html` (address/transport/attachment; mosh's
  SSH-then-UDP handoff; survival matrix; the two open questions below)
- New: `learning-records/0005-connection-ladder-and-hark.md`
- `herdr/plan.html`: two objectives added (name the ways in by layer; mosh vs herdr),
  new item `hdr-6` for lesson 0004, "In this folder" table filled in for 0003 and 0004
- `herdr/lessons/0002-*.html` and `0003-*.html`: socket-API lesson renumbered 0004 → **0005**;
  next-up pointers repointed
- `index.html`: herdr meter total 4 → 6, card blurb "0001–0004", lesson table gains 0003 and 0004

## Still open

- **Which iOS terminal app**, and what its actual issues are. User says "paid and has
  issues"; that is not debuggable as written. Lesson 0004 asks him to record it.
- **Mosh across real NAT is untested.** Everything so far was same-LAN. Same untested path
  as capstone ps-6 / record 0004.
- Lesson 0005 (socket API by hand) — promised since 0002, still unwritten.
- The contabo VPS as an always-on herdr host: it sidesteps the FileVault/reboot hole
  entirely and is already on the tailnet. Worth a decision, not yet made.
