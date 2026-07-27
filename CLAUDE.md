# teach — a stateful learning workspace

This directory is a **teach-skill workspace** (mattpocock skills, installed globally).
When the user asks to study, learn, continue a subject, or be taught something here,
invoke the `/teach` skill and treat this directory as the teaching workspace.

## How to orient (read in this order)

1. `MISSION.md` — why all of this exists. The headline goal is the **portable-sessions
   capstone**: move a live coding-agent session between devices (herdr's session model →
   t3code → SSH/Tailscale). Every teaching decision should trace back to it.
2. `NOTES.md` — user preferences and open items. Key ones: HTML for anything the user
   reads; two-active-subjects rule; single-sitting lesson sizes.
3. `learning-records/` — what's already known/decided; use it to compute the zone of
   proximal development.
4. `RESOURCES.md` — the curated high-trust sources. Draw lesson knowledge from here,
   not from parametric memory.
5. `index.html` — the user's dashboard, linking every subject folder.

## Layout convention

**One folder per subject at the workspace root.** Everything about a subject lives in
its folder:

```
<subject>/
  plan.html        objectives + action items (checkboxes with data-item ids)
  lessons/         NNNN-<name>.html, one tight idea each
  reference/       cheat sheets, glossaries for that subject
```

Current subjects: `herdr/` (active), `ai-tooling/` (active), `portable-sessions/`
(capstone), `networking/`, `rust-tauri/`, `llm-internals/` (queued),
`js-internals/`, `ffmpeg/` (backlog).

## Rules

- New subject → new root folder `<dash-case-name>/` with a `plan.html`, plus a card in
  `index.html`. Follow the existing plan pages' structure (objectives, action items with
  `data-item` checkboxes, verification block).
- Every HTML page links the shared stylesheet (`assets/style.css`; `../assets/` from
  subject root, `../../assets/` from lessons/reference) so everything reads as one course.
- Learning records are cross-subject and stay at the root: `learning-records/NNNN-slug.md`,
  incrementing the number.
- Active subjects: **herdr** and **ai-tooling**. Do not activate others without the user
  explicitly choosing to swap.
- Commit meaningful changes to git as you go; remote is github.com/jainChetan81/teach.
