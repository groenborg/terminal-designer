# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page React app: an interactive designer for terminal color schemes with a live vim-in-terminal preview and exporters for Ghostty and iTerm2. Deployed to GitHub Pages at base path `/terminal-designer/` (see `vite.config.ts`).

## Commands

Uses **Bun** as the package manager (see `bun.lock` and `.github/workflows/deploy.yml`).

- `bun install` — install deps
- `bun run dev` — Vite dev server
- `bun run build` — `tsc --noEmit` type-check, then `vite build` into `dist/`
- `bun run preview` — preview the production build
- `bun run test` — run Vitest once (snapshot tests in `src/lib/__snapshots__/`)
- `bun run test:watch` — Vitest watch mode
- `bun run test -- src/lib/export.test.ts` — single test file
- `bun run test -- -u` — update snapshots
- `bun run lint` — Biome check
- `bun run format` — Biome format --write

CI (`.github/workflows/deploy.yml`) runs `bun run build` on push to `main` and deploys `dist/` to GitHub Pages.

## Architecture

Three-layer design centered on a single `Theme` object that flows top-down from `App`:

1. **`src/types.ts`** — single source of truth for shapes. `Theme` holds `background`, `foreground`, `cursor`, `selection`, and a 16-element `ansi` palette. Token classes (`TokenClass`) identify syntax categories in the previewed code; `TokenAnsiMap` maps each class to either an ANSI index or the literal `'fg'`.
2. **`src/App.tsx`** — owns theme state, preset selection, font settings, and panel collapsed state. Persists `theme` to `localStorage` under key `tdesign.theme` (rehydrated on mount from `PRESETS.dracula` fallback). Cursor blink is a 530ms interval toggling `showCursor`.
3. **Components**:
   - `components/Terminal.tsx` — read-only preview. Renders a fake vim buffer from `data/codeContent.ts` (`CODE_LINES` + `TOKEN_ANSI`), inlining all colors as inline styles derived from the current `Theme`. Hardcoded `cursorRow`/`cursorCol` and a hardcoded selection (`isSelected`) simulate editing state.
   - `components/Panel.tsx` — the designer UI. Draggable + collapsible. Edits propagate via `update(patch)` which spreads into `setTheme`. `ExportModal` is a sub-component here that renders JSON / Ghostty / iTerm tabs.

### Export format rules (`src/lib/export.ts`)

- `toGhostty` — `palette = N=#RRGGBB` lines; `background`/`foreground`/`cursor-color`/`selection-background` stripped of `#`.
- `toIterm` — XML plist with `Red/Green/Blue Component` as normalized (0–1) reals to 4 decimal places, color space `sRGB`.
- Both are covered by snapshot tests over all entries in `PRESETS`. When you change output, update snapshots with `bun run test -- -u`.

### Styling

All visuals live in the root `styles.css` (not CSS modules). Theme-dependent colors are applied as inline styles in JSX so they react to state; `styles.css` only handles structure, layout, and non-themed chrome.

## Conventions

- Biome enforces single quotes in JS/TS, double quotes in JSX, semicolons, trailing commas everywhere, 100-col lines, 2-space indent. `a11y` rules and `noArrayIndexKey` are disabled — don't fight them.
- `tsc --noEmit` is part of `build`; TypeScript errors break CI.
- Snapshot directories are excluded from Biome (`**/__snapshots__/**`).
