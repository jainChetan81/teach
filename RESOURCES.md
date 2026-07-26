# teac Resources

High-trust sources per track. Knowledge for lessons is drawn from here, not from
parametric guesses. Prune ruthlessly; annotate every entry.

## Knowledge

### AI Tooling & Coding Agents
- [aihero.dev — Matt Pocock](https://www.aihero.dev/)
  Articles and courses on how coding agents work, context management, and agent engineering. Use for: the agent loop, tokens, context windows, Claude Code fluency.
- [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code)
  Skills, hooks, subagents, memory, MCP configuration. Use for: workflow-level features.
- [Model Context Protocol spec](https://modelcontextprotocol.io)
  Primary source for hosts/clients/servers and the tools/resources/prompts primitives. Use for: MCP track, toy server build.
- [PAL MCP — BeehiveInnovations](https://github.com/BeehiveInnovations/pal-mcp)
  Provider-abstraction MCP server. Use for: understanding multi-provider routing; trace one call through it.

### Rust & Tauri
- [rustlings](https://github.com/rust-lang/rustlings)
  Small compile-fix exercises. Use for: Module 1 drills, in the order listed on the track page.
- [The Rust Book](https://doc.rust-lang.org/book/)
  Ch. 4 (ownership) is the load-bearing chapter. Use for: retrieval exercises on ownership/borrowing.
- [Tauri v2 docs](https://v2.tauri.app/)
  Commands, state, events, plugins. Use for: mapping and modifying his existing apps.

### Networking
- [RFC 4253 (SSH transport layer)](https://www.rfc-editor.org/rfc/rfc4253)
  Primary source for the SSH handshake. Use for: verifying the from-memory handshake diagram.
- [Tailscale blog — "How Tailscale works"](https://tailscale.com/blog/how-tailscale-works)
  WireGuard, control plane, DERP relays, NAT traversal. Use for: Module 3.
- [WireGuard whitepaper](https://www.wireguard.com/papers/wireguard.pdf)
  Dense but primary. Use for: the toy-tunnel build, key exchange details.

### LLM Internals + kharcha
- [Karpathy — "Let's build GPT: from scratch, in code"](https://www.youtube.com/watch?v=kCc8FmEb1nY)
  Code-along, not watch-along. Use for: llm-1.
- [Karpathy — "Let's build the GPT Tokenizer"](https://www.youtube.com/watch?v=zduSFxRajkE)
  BPE from first principles. Use for: llm-2.
- [nanoGPT](https://github.com/karpathy/nanoGPT)
  Minimal GPT training repo. Use for: llm-3 training run.
- `plans/kharcha_ml_plan.pdf` (in this workspace)
  His existing 8-week plan: TinyBERT/MiniLM fine-tune → ONNX → onnxruntime-react-native fallback parser. Use for: Module 2 of the llm-internals track.

### JS Runtime Internals
- `plans/comprehensive-study-plan.md.pdf` and `plans/esbuild-learning-roadmap.md.pdf` (in this workspace)
  His existing plans: bundlers, fastify, node, bun with verification checkpoints. Use for: the js-internals track.
- [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
  200-line tokenizer→parser→transformer→generator. Use for: AST module.
- [astexplorer.net](https://astexplorer.net/)
  Interactive AST visualization. Use for: AST intuition.

### ffmpeg
- [ffmpeg documentation](https://ffmpeg.org/ffmpeg.html)
  Primary reference. Use for: filtergraph syntax, stream specifiers.
- [ffmpeg wiki](https://trac.ffmpeg.org/wiki)
  Recipe-style guides (concat, gif, encoding). Use for: the ten-commands cheat sheet.

## Wisdom (Communities)

- [r/rust](https://reddit.com/r/rust) and the Rust users forum (users.rust-lang.org)
  Beginner-friendly, heavily moderated. Use for: ownership confusion, lifetime walls.
- [Tauri Discord](https://discord.com/invite/tauri)
  Fast answers on commands/state/plugins. Use for: app-modification blockers.
- [r/LocalLLaMA](https://reddit.com/r/LocalLLaMA)
  Fine-tuning and small-model practice. Use for: kharcha model choices, quantization questions.
- [r/selfhosted](https://reddit.com/r/selfhosted) / [r/homelab](https://reddit.com/r/homelab)
  VPS hardening and tunnel setups. Use for: networking Module 4 sanity checks.

## Gaps

- **Herdr internals**: no verified primary source collected yet. First action of the networking track's Module 2 must locate official docs/source and add the link here.
- **t3code**: repo/docs link not yet recorded — add at ai-9 when cloned.
- No community chosen yet for AI agent engineering specifically (aihero.dev community is a candidate).
