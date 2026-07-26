# Mission: Own the tools I use every day

## Why
Chetan is a strong frontend engineer (React/TS) who uses coding agents, Tauri apps, SSH,
and LLM-powered tools daily — but mostly from the outside. The concrete goal that ties
most of this workspace together: **carry a live coding-agent session from one device to
another.** Understand how herdr (ogulcancelik/herdr — a Rust agent multiplexer with a
persistent PTY session server) preserves sessions, apply the same model to t3code
(pingdotgg/t3code — SQLite-backed web GUI for agents), and move sessions across devices
over SSH and Tailscale. That capstone deliberately pulls on every other track: Rust to
read herdr's source, TS/Tauri context for t3code, SSH/VPN internals for the transport.
The deeper driver: previous study plans died from motivation failure, not ability — so
the mission is as much *finishing things* as learning things.

## Success looks like
- The portable-sessions capstone demoed: start an agent session on one machine, continue it on another, and explain which layer made each part work.
- A t3code fork running on his Kimi subscription, and at least one of his own Tauri apps running Rust code he wrote.
- He can whiteboard, from memory: the coding-agent loop, an SSH handshake, herdr's client-server architecture.
- kharcha gets an explicit go/no-go decision on the 8-week ML plan — either shipped or deliberately deferred, not drifted into.
- The two-active-tracks rule holds: no more than two tracks active at once.

## Constraints
- Motivation is the scarce resource. Every step small enough for one sitting; visible progress is a feature, not decoration.
- **Studying happens in Claude Code** (the user runs `/teach` there), not on the Kimi platform. This workspace must be self-contained for Claude Code: see CLAUDE.md.
- Workspace lives at `~/Desktop/teach` (iCloud-synced), git-versioned, HTML for anything the user reads; Markdown for agent state only.
- Strong prior: React/TS/JS, some ONNX-runtime exposure, 3–4 self-built Tauri apps in daily use.

## Out of scope (for now)
- New languages beyond Rust (Go/Zig read-only where plans require).
- js-internals and ffmpeg tracks: planned but parked; activate only when an active track finishes.
- Production-grade ML/MLOps beyond what kharcha needs.
