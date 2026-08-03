# 0006 — NotchTap becomes the second active subject

Date: 2026-08-03
Subjects touched: `notchtap-tauri` (active), `ai-tooling` (queued), `herdr` (active)

## Decision

The user chose NotchTap as the second active subject beside herdr. The generic ai-tooling
track returns to the queue. The two-active-subject rule still holds.

## Confirmed app identity

- Working copy: `~/Desktop/code/mac-notification-nudge`
- Git remote: `https://github.com/jainChetan81/notchtap.git`
- Product name: NotchTap
- Stack: React 19, TypeScript, Vite, Motion, Tauri v2, Rust, and a small Swift helper
- Frontend entries: overlay and settings
- Overlay direction: receive-only Tauri events
- Settings direction: typed calls into an allowlisted Rust command set

The existing app repo is the exercise codebase. No duplicate app repo belongs inside the
teach workspace. The new `notchtap-tauri/` folder is the learning track.

## Teaching order

1. Map the frontend from event hook to rendered pixels.
2. Capture the user's actual UI defects.
3. Fix one frontend-only defect with a failing regression test.
4. Learn Tauri events, commands, and capabilities through the existing boundary.
5. Fix two more defects, including one cross-boundary defect.

## Motivation constraint

Do not generate a sequence of lessons in advance. The plan and frontend map are enough.
Create the next lesson only after `nt-1` is complete.
