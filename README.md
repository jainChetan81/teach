# teach

A stateful learning workspace — my personal system for actually *finishing* the things I
want to learn, instead of collecting study plans that die at 5%.

Synced via iCloud, versioned here, and designed to be driven by an AI teacher
(Claude Code, using Matt Pocock's `/teach` skill).

**Start here: open [`index.html`](index.html) — the dashboard.**

---

## The mission

**Own the tools I use every day — from the inside.**

The concrete goal tying most of this together: **carry a live coding-agent session from
one device to another.** Understand how [herdr](https://github.com/herdrdev/herdr)
preserves sessions, apply the same model to [t3code](https://github.com/pingdotgg/t3code),
and move sessions over SSH/Tailscale. That capstone deliberately pulls on every other
subject: Rust (herdr's source), TS (t3code), SSH and VPN internals (the transport).

The deeper mission is about *finishing*: previous plans failed from motivation, not
ability. So this workspace is built around small single-sitting wins, visible progress,
and a hard rule — **at most two active subjects at any time.**

## What I'm learning

| Folder | Subject | Status |
|---|---|---|
| [`herdr/`](herdr/plan.html) | The agent multiplexer with sessions that never die — use it, then understand its internals | **active** |
| [`notchtap-tauri/`](notchtap-tauri/plan.html) | Learn the frontend and Tauri boundary by fixing NotchTap UI issues | **active** |
| [`ai-tooling/`](ai-tooling/plan.html) | How coding agents work (agent loop, tokens, context) · MCP · PAL MCP · t3code fork with a Kimi provider | queued |
| [`portable-sessions/`](portable-sessions/plan.html) | 🏁 **Capstone**: move a live agent session between devices | capstone |
| [`networking/`](networking/plan.html) | SSH to muscle memory · WireGuard/Tailscale/NAT traversal · my own VPS | queued |
| [`rust-tauri/`](rust-tauri/plan.html) | Deeper Rust foundations after the practical NotchTap track | queued |
| [`llm-internals/`](llm-internals/plan.html) | Build a GPT with Karpathy → fine-tune a tiny SMS parser for kharcha | queued |
| [`js-internals/`](js-internals/plan.html) | esbuild → fastify → node → bun (from my existing study plans) | backlog |
| [`ffmpeg/`](ffmpeg/plan.html) | Containers vs codecs, ten commands from memory, one automation | backlog |

## How this workspace is used

**For me (the human):**

1. Open `index.html` on any device (it's on my iCloud-synced Desktop).
2. Pick the active subject, open its `plan.html`, do the next unchecked action item.
   Every item is sized for one sitting.
3. Lessons (`<subject>/lessons/`) are where teaching happens — short, interactive, with
   quizzes. Cheat sheets (`<subject>/reference/`) are what future-me re-opens.
4. Checkboxes persist in the browser. A subject is "done" when its verification block
   passes — then a queued subject goes active.

**For the AI teacher (Claude Code):**

- `CLAUDE.md` orients any agent session: layout, conventions, rules. Point Claude Code at
  this folder and say "continue my teach workspace" or run `/teach`.
- `MISSION.md` — the why, success criteria, and constraints. Every lesson traces back to it.
- `RESOURCES.md` — curated high-trust sources; lessons are built from these, not from the
  model's memory.
- `learning-records/` — what I've demonstrably learned, used to pitch the next lesson at
  the right difficulty (zone of proximal development).
- `NOTES.md` — my preferences and open items.

**Growing it:** new subject → new root folder (`<subject>/plan.html`) + a card on the
dashboard. New lesson → `<subject>/lessons/NNNN-name.html`. Everything is HTML for
reading, Markdown for agent state.

## What the `/teach` skill does

[Matt Pocock's teach skill](https://github.com/mattpocock/skills) (installed globally in
`~/.claude/skills`) turns an agent into a stateful tutor over multiple sessions:

- **Mission-first** — it interrogates *why* you're learning something before teaching
  anything, so lessons stay grounded in real goals.
- **Lessons as the unit of teaching** — small, self-contained HTML pages, each one quick
  win, built from shared components so the course feels like one course.
- **Real pedagogy** — retrieval practice, spacing, and desirable difficulty over the
  illusion of fluency. Knowledge comes from trusted sources (with citations), skills come
  from interactive feedback loops, wisdom comes from communities.
- **Stateful memory** — learning records track what you actually know, so each session
  starts where the last one ended instead of re-teaching or over-shooting.

The skill provides the method; this repo is the state it operates on.

---

<sub>Created July 2026 · progress lives in browser localStorage · plans in
[`plans/`](plans/) preserved as source material</sub>
