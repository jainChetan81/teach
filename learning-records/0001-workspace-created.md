# Workspace created; baseline established

The teac workspace was created on 2026-07-26 as a stateful teaching environment covering
six tracks: ai-tooling, rust-tauri, networking, llm-internals (+kharcha), js-internals,
ffmpeg. This matters for future sessions because it fixes the baseline: six tracks were
consolidated from the user's list of ~13 topics, and the two-active-tracks rule was
established as the core anti-overwhelm mechanism (active: ai-tooling + rust-tauri;
queued: networking, llm-internals; backlog: js-internals, ffmpeg).

## Evidence

User supplied his full topic list, three prior study-plan PDFs (preserved in `plans/`),
and stated that previous plans failed from motivation, not comprehension.

## Implications

- Do not propose new tracks or expand scope until an active track ships its verification.
- Prior knowledge to not re-teach: React/TS/JS (deep), basic ONNX-runtime usage,
  Tauri app scaffolding (has shipped 3–4 apps), git.
- The user's stated Rust level is near-zero; kharcha plan also assumes zero ML training
  experience — the llm-internals track starts from Karpathy, not from theory.
