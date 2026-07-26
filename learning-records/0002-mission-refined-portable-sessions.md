# Mission refined: portable agent sessions became the through-line

The user clarified on 2026-07-26 (evening) that herdr and t3code are not independent
curiosities: the goal is to understand how herdr preserves sessions, apply the same model
to t3code, and move a live agent session between devices over SSH/Tailscale. This matters
because it converts four loosely-related tracks into one dependency graph with a concrete
capstone (`topics/portable-sessions`), which is a much stronger motivation structure than
"learn each tool."

## Evidence

User statement: "I want to understand how to preserve session in herdr and then apply the
same formulae to t3code and see through tailscale and ssh if I can preserve session moving
from one device to another — that is why I need to understand all 4 concepts."

## Implications

- Teach networking (SSH/Tailscale) and ai-tooling (t3code internals) *in service of* the
  capstone phases, not as abstract modules — order lessons to feed ps-1…ps-8.
- herdr source reading is real-world Rust practice: align rust-tauri Module 1 completion
  with capstone Phase 1 so ps-2 lands right after rustlings basics.
- MISSION.md updated to make the capstone the headline goal.
