# Career Edition

Independent React entry at `/Portfolio/career.html`. The original home page and project pages are preserved.

## Edit content

- `content.ts`: profile, strengths, project case notes, tools, process, links, and contact address.
- `Career.tsx`: layout and interactions.
- `career.css`: dedicated styling. Do not import this stylesheet into the original entry.
- `../../career.html`: HTML metadata (repository root `career.html`).

The positioning, tool list, and Why/Problem copy are editable drafts based on the request and public implementations. Confirm actual responsibilities, tool usage, and intent before using this page in applications. No employer, tenure, team size, quantitative result, or proficiency score has been invented. `profile.email` is deliberately `null`; replace it only with a verified address.

## Build and publish

Use the existing pnpm lockfile and install flow. `npm run build` invokes the existing Vite build script. The GitHub Pages workflow already sets `GITHUB_PAGES=true`, which sets the base path to `/Portfolio/`. Vite emits both `dist/index.html` and `dist/career.html`. The Career entry owns its metadata and skips the original Figma metadata injection.

Only the new entry imports the Career stylesheet. Existing `src/App.tsx`, `src/main.tsx`, `src/index.css`, `index.html`, `public/404.html`, assets, package files, and deployment workflow are unchanged. Links to existing React project routes use the original `?p=` restoration mechanism to avoid a GitHub Pages 404 round trip.

## Motion and contact

GIFs reuse the original assets. Loading is deferred until near the viewport. A motion toggle replaces animated media with a canvas still frame and stops entry animations; the system reduced-motion preference is respected. The two source GIFs total approximately 42 MB; they have deliberately not been replaced or recompressed.

With no verified email address, CONTACT opens an accessible native dialog explaining that contact details are being prepared and offering the real GitHub profile. Escape closes it and focus returns to the trigger. No dummy email or social links are used.

## Content sources

- https://github.com/harayuki415/Portfolio
- https://github.com/harayuki415/dogdash
- https://github.com/harayuki415/music
