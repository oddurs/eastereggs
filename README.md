# Hidden in Source

A small editorial field guide to Easter eggs in open-source software. Built with React, TypeScript, Vite, and Tailwind CSS. Statically hosted on GitHub Pages.

## Development

```sh
npm install
npm run dev
```

Vite prints the local and network preview addresses. `npm run build` checks TypeScript and builds the production site; `npm run preview` serves that build.

## Content

`src/stories.ts` contains the collection. Every entry includes a pinned source revision and a link to the upstream file history. Source files were checked September 27, 2026. GitHub is a mirror for SQLite; its story also links to the original Fossil history.

The site includes six article dialogs with shareable hash URLs, search (Cmd/Ctrl+K), language filters, local bookmarks, and a small Easter egg of its own. Suggestions open a prefilled GitHub issue for the visitor to review and post. Fonts are loaded from Google Fonts, with system fallbacks.

## Publishing

The GitHub Actions workflow builds and deploys pushes to `main`. The repository's Pages setting must use **GitHub Actions**. The build uses `/eastereggs/` as its base path; adjust the workflow if the repository is renamed.

## Visual system

Tailwind v4 tokens in `src/styles.css` define the paper, ink, muted, line, and surface colors, plus sans-serif and monospace typography. Illustrations are inline SVG and ASCII, so the visual assets remain small and editable.
