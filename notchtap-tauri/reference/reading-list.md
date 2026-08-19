# The verified reading list

Every page opened and checked on 19 August 2026. No guessed links.

**Do not read all of it.** The full list is about three and a half hours. The short path below
is about a hundred minutes and covers everything the app actually uses. Take the short path.
Come back for the rest only when something in the code does not make sense.

**Calibration note.** You are a senior web developer. The React and Motion pages are here for
completeness, not because you need teaching on them. Skim or skip. The Rust and Tauri pages are
where your actual gap is, and they are the ones worth slowing down on.

## The short path: ten pages, about 100 minutes

| # | Page | Time | Why this one |
|---|---|---|---|
| 1 | [What is Tauri?](https://v2.tauri.app/start/) | 3 min | The whole idea, before any detail. |
| 2 | [Process Model](https://v2.tauri.app/concept/process-model/) | 4 min | The most important page here. Two separate programs. Everything else is how they talk. This one was missing from your list entirely. |
| 3 | [Calling Rust from the Frontend](https://v2.tauri.app/develop/calling-rust/) | 21 min | Door one. Skip its Event System section; you get events properly in the next page. |
| 4 | [Calling the Frontend from Rust](https://v2.tauri.app/develop/calling-frontend/) | 11 min | Door two, and the one NotchTap lives on. Seven of its wires are this. |
| 5 | [State Management](https://v2.tauri.app/develop/state-management/) | 6 min | The Rust side of the word "state". A different meaning from React's. |
| 6 | [Permissions](https://v2.tauri.app/security/permissions/) | 5 min | Read before capabilities, or the permission file is unreadable. |
| 7 | [Capabilities](https://v2.tauri.app/security/capabilities/) | 6 min | Now NotchTap's per-window allowlist makes sense. |
| 8 | [React Animation](https://motion.dev/docs/react-animation) | 16 min | The base layer. The exit idea is introduced here, not in AnimatePresence. |
| 9 | [AnimatePresence](https://motion.dev/docs/react-animate-presence) | 14 min | What makes NotchTap's card open and close at all. |
| 10 | [Preserving and Resetting State (React)](https://react.dev/learn/preserving-and-resetting-state) | 23 min | The one you had filed under the wrong site. Explains why an animation silently does not run. |

Item 2 and item 10 were both missing from your original list. Item 2 is the one that
actually answers "how do the two halves talk". Item 10 is a React page, and it is the reason
an exit animation silently does not run.

## The rest, when you need it

### Tauri, the boundary

| Page | Time | Covers |
|---|---|---|
| [Inter-Process Communication](https://v2.tauri.app/concept/inter-process-communication/) | 2 min | Names the only two ways across. Very short. |
| [Tauri Architecture](https://v2.tauri.app/concept/architecture/) | 11 min | Makes the library names in the project files recognisable. |
| [event API reference](https://v2.tauri.app/reference/javascript/api/namespaceevent/) | skim | Exact spellings of listen, emit, emitTo. |
| [Debug](https://v2.tauri.app/develop/debug/) | short | How to open developer tools in a window with no bar to click. |

### Tauri, the lockdown

| Page | Time | Covers |
|---|---|---|
| [Security](https://v2.tauri.app/security/) | 4 min | Why the permission system exists, so it stops feeling like paperwork. |
| [Runtime Authority](https://v2.tauri.app/security/runtime-authority/) | 1 min | The thing that checks, at the moment of the call, whether this window may do this. 180 words. |
| [Command Scopes](https://v2.tauri.app/security/scope/) | 3 min | Only matters once something needs limited file or web access. |

### Tauri, the window itself

| Page | Time | Covers |
|---|---|---|
| [Configuration reference](https://v2.tauri.app/reference/config/) | search it | Twenty thousand words. Do not read it. Search for `macOSPrivateApi`, which is what lets the window be see-through on a Mac, and for `alwaysOnTop`. |
| [Configuration Files](https://v2.tauri.app/develop/configuration-files/) | 10 min | Where the settings live, before opening the giant list. |
| [Window Customization](https://v2.tauri.app/learn/window-customization/) | 6 min | See-through windows on macOS. Does not cover always-on-top. |

### Motion, the movement

Skim these. You know this territory.

| Page | Time | Covers |
|---|---|---|
| [Transitions](https://motion.dev/docs/react-transitions) | 23 min | How the movement feels. |
| [Easing functions](https://motion.dev/docs/easing-functions) | 6 min | The named curves. |
| [Layout Animation](https://motion.dev/docs/react-layout-animations) | 18 min | Worth more than a skim. NotchTap uses `layout="position"`, and it is behind the agent board's re-measuring problem. A notch that grows and shrinks *is* a layout animation. |
| [motion component](https://motion.dev/docs/react-motion-component) | lookup | A dictionary. Keep it open; do not read it through. |

## One page the Tauri site does not have

NotchTap's build script uses an app-level command list to make every Rust command
deny-by-default. That exact feature is **not documented on the Tauri guide site at all**.
The only real description is in the generated code documentation:
[docs.rs, tauri_build, AppManifest](https://docs.rs/tauri-build/latest/tauri_build/struct.AppManifest.html).
The guide only shows a plugin-flavoured cousin on the
[Plugin Development](https://v2.tauri.app/develop/plugins/) page.

The general lesson: when a project uses something the official guide does not cover, the
generated code documentation is the source of truth, and you should expect to read it.
