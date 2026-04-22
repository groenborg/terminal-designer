# Terminal Designer

An interactive designer for terminal color schemes. Tweak a theme in a floating panel and see the result rendered live in a vim-in-terminal preview, then export to Ghostty, iTerm2, or JSON.

## Features

- Live preview that re-renders as you edit — a fake vim buffer showing a syntax-highlighted TypeScript file plus status line and command line.
- Full control over `background`, `foreground`, `cursor`, `selection`, and the 16-color ANSI palette, with both color-picker swatches and hex inputs.
- Built-in presets: **Dracula**, **Nord**, **Gruvbox Dark**.
- Export to **Ghostty** config, **iTerm2** `.itermcolors` plist, or plain JSON — copy to clipboard or download.
- Font family (JetBrains Mono / Fira Code) and size controls.
- Theme is persisted to `localStorage` so your work survives a reload.

## Getting started

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev
```

Then open the URL Vite prints (usually `http://localhost:5173/terminal-designer/`).

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Vite dev server |
| `bun run build` | Type-check (`tsc --noEmit`) then build to `dist/` |
| `bun run preview` | Preview the production build |
| `bun run test` | Run Vitest once |
| `bun run test:watch` | Vitest in watch mode |
| `bun run lint` | Biome check |
| `bun run format` | Biome format --write |

## Tech stack

React 18 · TypeScript · Vite · Vitest · Biome · Bun.

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy.yml`. The app is served from the `/terminal-designer/` base path.
