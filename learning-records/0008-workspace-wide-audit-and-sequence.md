# 0008 — Workspace-wide audit and learning sequence (2026-08-05)

## What happened

At the user's request, every file across all 9 subject folders was checked: every
factual claim in every lesson and reference page was cross-checked against its cited
primary source (live docs, GitHub repos, RFCs, or — for notchtap-tauri — the real app
source at `~/Desktop/code/mac-notification-nudge`). One subagent per subject folder ran
this check independently, then the findings were synthesized into a workspace-wide
learning sequence.

## Errors found and fixed

- **herdr/lessons/0003 + cheat sheet**: taught a fabricated command,
  `herdr server live-handoff`. The real command is `herdr update --handoff`.
- **herdr cheat sheet**: socket-API example used dead syntax from an old herdr version
  (`1-1` pane IDs, `herdr wait agent-status`). Fixed to current `w1:p1` / `herdr agent
  wait` syntax.
- **herdr cheat sheet**: agent-state table was missing the real `unknown` state.
- **herdr/lessons/0002**: the "survival ladder" diagram implied its rungs stack
  additively within one pane; corrected — they stack across different panes, not within
  one.
- **Repo owner**: `ogulcancelik/herdr` redirects; the real org is `herdrdev/herdr`. Fixed
  across RESOURCES.md, MISSION.md, README.md, NOTES.md, herdr/plan.html, herdr lesson
  0001, and portable-sessions/plan.html.
- **RESOURCES.md**: PAL MCP link was dead (`pal-mcp` → 404); real repo is
  `pal-mcp-server`.
- **t3code's session store**: called "SQLite-backed" with more certainty than public
  docs support (docs only say "one SQL transaction," never name the engine). Softened
  in RESOURCES.md, NOTES.md, and portable-sessions/plan.html.
- **portable-sessions Phase 4**: treated t3code's remote/portability story as an open
  design question. It isn't — t3code already ships Tailscale pairing and an SSH-launch
  mode. Rewrote Phase 4 to be "set it up and demo it," not "invent it."
- **networking/plan.html + RESOURCES.md**: net-2 asked to verify the full SSH handshake
  including auth against RFC 4253, but 4253 stops at host-key verification — auth is
  RFC 4252. Added the citation and reworded net-2.
- **RESOURCES.md**: net-12 asks to read "the mosh USENIX paper" but it was never listed
  as a source. Added.
- **llm-internals/plan.html**: nanoGPT is now frozen/deprecated by Karpathy (superseded
  by `nanochat`). Noted — the exercise still works, this is a heads-up, not a blocker.
- **rust-tauri/plan.html**: added a note that Module 1 unlocks herdr's `hdr-4` right now
  and shouldn't wait for notchtap-tauri to finish, and that Module 2 duplicates
  notchtap-tauri Modules 3–4 as currently written.
- **ai-tooling/plan.html**: added a note that Module 4 (t3code + Kimi spike) is the real
  deliverable and should come before Modules 1–3 when this subject reactivates; corrected
  the assumption that a single `@t3tools/contracts` package holds provider-adapter logic
  (it's actually per-provider packages like `effect-acp`, `effect-codex-app-server`).

Everything else — all four herdr lessons' core technical claims, every notchtap-tauri
file (checked line-for-line, including exact file/line citations, against the real app
repo), and the remaining resource links across all 9 subjects — held up under
verification.

## The learning sequence (full reasoning on `learning-path.html`)

1. Finish reading herdr lessons 0001–0004 (written, now fact-checked; NOTES.md's own
   observation — four lessons written, zero read — is still the single biggest blocker).
2. Name one specific broken NotchTap animation so lesson 0002 can be written.
2b. Pull rust-tauri's Module 1 (rustlings + Rust Book ch. 4) forward as a small
   side-quest — it unlocks herdr's own `hdr-4` right now, no need to wait for
   notchtap-tauri.
3. Decide the kharcha go/no-go (llm-internals `llm-5`) — this has been silently
   unresolved since it was deferred; nothing in `learning-records/` ever recorded a
   decision.
4–5. When a subject slot frees, take networking next (Module 1 SSH → Modules 2–4).
6. Before the last slot opens, resolve who owns the Kimi-provider spike — ai-tooling
   `ai-11` and portable-sessions Phase 4 currently both claim it.
7. ai-tooling, starting at Module 4 (not Module 1).
8. rust-tauri Module 2, rewritten first to stop duplicating notchtap-tauri.
9. portable-sessions capstone, once the above are substantially done.
- llm-internals Module 1 (Karpathy) can run any time post-decision, independent of the
  above; Module 2 (kharcha itself) only if the go/no-go was "go."
- Backlog: js-internals before ffmpeg (existing detailed plans, closer tie to daily
  frontend work; ffmpeg has no dependency link to the capstone at all).

## Key structural findings worth remembering

- **hdr-4 is currently stuck**: it's gated on rust-tauri Module 1, which is gated behind
  notchtap-tauri finishing under the naive reading of the queue — but nothing about
  hdr-4 actually requires notchtap-tauri. This is why 2b exists as an explicit exception.
- **Two feeder tracks (networking, ai-tooling) are currently dormant** while
  portable-sessions' plan assumes they're progressing. Phase 3's two checkboxes are
  already marked done in real life (mini↔MacBook over Tailscale) even though the
  networking subject itself shows zero formal progress — the practical work ran ahead of
  the "why" lessons.
- **The Kimi-provider spike is claimed by two plans** (ai-tooling `ai-11`, portable-
  sessions Phase 4) with no written decision about which owns it. Flagged for a decision
  before either gets built, to avoid doing the same work twice.
- **rust-tauri Module 2 and notchtap-tauri Modules 3–4 are near-duplicates** as currently
  written (both: map `src-tauri`, trace `invoke()`, make a customization, ship an
  improvement). Needs a rewrite before rust-tauri Module 2 activates, not just a warning.
