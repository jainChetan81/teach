# teach — a stateful learning workspace

This directory is a **teach-skill workspace** (mattpocock skills, installed globally).
When the user asks to study, learn, continue a track, or be taught something here,
invoke the `/teach` skill and treat this directory as the teaching workspace.

## How to orient (read in this order)

1. `MISSION.md` — why all of this exists. The headline goal is the **portable-sessions
   capstone**: move a live coding-agent session between devices (herdr's session model →
   t3code → SSH/Tailscale). Every teaching decision should trace back to it.
2. `NOTES.md` — user preferences and open items. Key ones: HTML for anything the user
   reads; two-active-tracks rule; single-sitting lesson sizes.
3. `learning-records/` — what's already known/decided; use it to compute the zone of
   proximal development.
4. `RESOURCES.md` — the curated high-trust sources. Draw lesson knowledge from here,
   not from parametric memory.
5. `index.html` — the user's dashboard. `topics/<name>/plan.html` holds each track's
   objectives and action items (checkbox state is the user's progress).

## Conventions

- New study topic → new `topics/<dash-case-name>/` folder with a `plan.html`, linked from
  a card in `index.html`. Follow the existing plan pages' structure (objectives, action
  items with `data-item` checkboxes, verification block).
- Lessons go in `lessons/NNNN-name.html`; reusable components in `assets/`; cheat sheets
  in `reference/`. Every HTML page links `assets/style.css` (or `../../assets/style.css`
  from topic folders) so everything reads as one course.
- Learning records go in `learning-records/NNNN-slug.md`, incrementing the number.
- Active tracks: **ai-tooling** and **rust-tauri**. Do not activate others without
  the user explicitly choosing to swap.
- Commit meaningful changes to git as you go.
