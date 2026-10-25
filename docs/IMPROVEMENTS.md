# What else can improve ASK Studio

Prioritized beyond the current complete core.

## High impact (next)

1. **Real process host** – Wire Electron/Tauri `exec` so Run/Terminal executes on the machine (not demo stubs).
2. **Native folder dialogs** – Replace demo FS with real open/create project dialogs.
3. **Monaco or CodeMirror** – Swap textarea editor for full IDE editing (multi-cursor, minimap, better syntax).
4. **Diagnostics → AutoFix pipeline** – Feed compiler/linter output into AutoFix automatically after Run.
5. **Tests** – Unit tests for path sandbox, allowlist, AutoFix rollback, ProjectService.

## Medium impact

6. **Persistence of layout** – Remember sidebar width, bottom panel, theme (partially done for theme).
7. **Search in project** – File name + content search (still no external web search).
8. **Git status** – Optional light git integration (status, diff) without requiring network.
9. **Output virtualization** – Large stdout handling in Run panel.
10. **Accessibility audit** – Full keyboard paths, screen reader labels on all icon buttons.

## Later / held by design

11. **AI prediction model backend** – Interface exists; model wiring is future.
12. **Distribution** – Installers, portable builds, code signing (distribution phase).
13. **Extension marketplace** – Only after sandbox isolation is proven.
14. **Collaborative editing** – Out of scope for personal studio v1.

## Security continuous work

- Fuzz path sandbox and allowlist
- Audit preview HTML handling
- Dependency scanning on host packages
- Optional strict mode: disable `bash -c` entirely
