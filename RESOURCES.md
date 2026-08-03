# teach Resources

High-trust sources per track. Knowledge for lessons is drawn from here, not from
parametric guesses. Prune ruthlessly; annotate every entry.

## Knowledge

### Portable Sessions capstone
- [herdr — ogulcancelik/herdr](https://github.com/ogulcancelik/herdr) · docs at [herdr.dev/docs](https://herdr.dev/docs)
  Rust agent multiplexer. Client-server: a background session server owns persistent PTYs; thin clients attach over a Unix socket or SSH (`herdr --remote`). Read the *concepts*, *session state*, and *remote* doc pages first. Use for: capstone Phase 1, networking Module 2.
- [t3code — pingdotgg/t3code](https://github.com/pingdotgg/t3code)
  Minimal web GUI for coding agents (Codex, Claude, Cursor, OpenCode). Effect/TS monorepo, provider-adapter pattern, SQLite session persistence. Docs live in `docs/` in-repo: *architecture overview*, *remote access*, *keeping T3 Code in sync*. No Kimi provider yet — that's the user's spike. Use for: capstone Phase 2, ai-tooling Module 4.

### AI Tooling & Coding Agents
- [aihero.dev — Matt Pocock](https://www.aihero.dev/)
  How coding agents work, context management, agent engineering. Use for: the agent loop, tokens, context windows.
- [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code)
  Skills, hooks, subagents, memory, MCP configuration. Use for: workflow-level features.
- [Model Context Protocol spec](https://modelcontextprotocol.io)
  Primary source for hosts/clients/servers and tools/resources/prompts. Use for: MCP module, toy server build.
- [PAL MCP — BeehiveInnovations](https://github.com/BeehiveInnovations/pal-mcp)
  Provider-abstraction MCP server. Use for: multi-provider routing; trace one call.

### Rust & Tauri
- `~/Desktop/code/mac-notification-nudge` (`jainChetan81/notchtap`)
  The live course codebase. React/TypeScript renders two Vite entries; Rust owns the engine, native input, event wires, and window behaviour. Use for every NotchTap exercise.
- [rustlings](https://github.com/rust-lang/rustlings)
  Small compile-fix exercises. Use for: Module 1 drills, in track-page order.
- [The Rust Book](https://doc.rust-lang.org/book/)
  Ch. 4 (ownership) is load-bearing. Use for: retrieval exercises on ownership/borrowing.
- [Tauri v2 docs](https://v2.tauri.app/)
  Commands, state, events, plugins. Use for: mapping and modifying his existing apps.
- [React documentation](https://react.dev/learn)
  State, effects, and custom hooks. Use for: tracing NotchTap's event hooks and render state.
- [Motion for React](https://motion.dev/docs/react)
  AnimatePresence, transitions, and reduced motion. Use for: NotchTap's surface swaps and exit choreography.
- herdr's own source (above) — real-world Rust to read once rustlings basics land.

### Networking
- [RFC 4253 (SSH transport layer)](https://www.rfc-editor.org/rfc/rfc4253)
  Primary source for the SSH handshake. Use for: verifying the from-memory handshake diagram.
- [Tailscale blog — "How Tailscale works"](https://tailscale.com/blog/how-tailscale-works)
  WireGuard, control plane, DERP relays, NAT traversal. Use for: Module 3.
- [WireGuard whitepaper](https://www.wireguard.com/papers/wireguard.pdf)
  Dense but primary. Use for: the toy-tunnel build.

### LLM Internals + kharcha
- [Karpathy — "Let's build GPT: from scratch, in code"](https://www.youtube.com/watch?v=kCc8FmEb1nY)
  Code-along, not watch-along. Use for: llm-1.
- [Karpathy — "Let's build the GPT Tokenizer"](https://www.youtube.com/watch?v=zduSFxRajkE)
  BPE from first principles. Use for: llm-2.
- [nanoGPT](https://github.com/karpathy/nanoGPT)
  Minimal GPT training repo. Use for: llm-3.
- `plans/kharcha_ml_plan.pdf` (in this workspace)
  His existing 8-week plan: TinyBERT/MiniLM fine-tune → ONNX → onnxruntime-react-native fallback parser. Use for: Module 2 of the llm-internals track.

### JS Runtime Internals
- `plans/comprehensive-study-plan.md.pdf` and `plans/esbuild-learning-roadmap.md.pdf` (in this workspace)
  His existing plans: bundlers, fastify, node, bun with verification checkpoints.
- [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
  200-line tokenizer→parser→transformer→generator. Use for: AST module.
- [astexplorer.net](https://astexplorer.net/)
  Interactive AST visualization.

### ffmpeg
- [ffmpeg documentation](https://ffmpeg.org/ffmpeg.html)
  Primary reference: filtergraph syntax, stream specifiers.
- [ffmpeg wiki](https://trac.ffmpeg.org/wiki)
  Recipe-style guides. Use for: the ten-commands cheat sheet.

## Wisdom (Communities)

- [r/rust](https://reddit.com/r/rust) and users.rust-lang.org
  Beginner-friendly, heavily moderated. Use for: ownership confusion, lifetime walls.
- [Tauri Discord](https://discord.com/invite/tauri)
  Fast answers on commands/state/plugins.
- [r/LocalLLaMA](https://reddit.com/r/LocalLLaMA)
  Fine-tuning and small-model practice. Use for: kharcha model choices.
- [r/selfhosted](https://reddit.com/r/selfhosted) / [r/homelab](https://reddit.com/r/homelab)
  VPS hardening and tunnel setups.
- herdr and t3code both have active GitHub communities (issues/discussions); t3code has a Discord. Use for: capstone design-review questions.

## Gaps

- None blocking. If herdr's docs prove thin on session-state internals, fall back to reading source (Rust track synergy) and record findings in `reference/`.
