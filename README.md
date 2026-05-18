# Phone Screen — Interview Toolkit

Multi-candidate phone-screen interview guide built with **Vite + React + TypeScript**,
auto-deployed to **GitHub Pages**.

## Live URL

After enabling Pages (see below), the site is served at:

```
https://<owner>.github.io/<repo>/
```

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # outputs to dist/
npm run preview      # serve dist/ locally
```

## Project structure

```
.
├── index.html                       # Vite React entry
├── vite.config.ts                   # base path = /<repo>/ in prod
├── public/
│   └── candidates/
│       └── <id>/                    # one folder per candidate (static assets)
│           ├── index.html           # redirect shim → React agenda overview
│           ├── selfIntro/...
│           ├── technicalQuestions/...
│           ├── codingTest/...
│           ├── candidateQuestions/...
│           └── printNote/...
└── src/
    ├── main.tsx
    ├── App.tsx                      # HashRouter
    ├── styles/
    │   ├── global.css               # Home + reset
    │   └── agenda.css               # per-candidate agenda overview (verbatim port)
    ├── data/
    │   ├── types.ts                 # CandidateConfig + AgendaSection
    │   ├── candidates.ts            # registry (import + list all configs here)
    │   └── asset.ts                 # candidateAsset(id, path) → BASE_URL-safe URL
    ├── candidates/
    │   └── <id>.ts                  # one config-only file per candidate
    ├── components/                  # AgendaNavbar / QuickPanel / OverviewTable / …
    └── pages/                       # Home, CandidateAgenda, NotFound
```

## Adding a new candidate

1. Create the static guide pages under
   `public/candidates/<new-id>/{selfIntro,technicalQuestions,codingTest,candidateQuestions,printNote}/`
   (mirror Jorge's layout — sub-page filenames `interview-guide.html`).
2. Copy `public/candidates/jorge/index.html` to
   `public/candidates/<new-id>/index.html` and change the hash route at the
   bottom to `#/candidate/<new-id>`.
3. Create `src/candidates/<new-id>.ts` exporting a `CandidateConfig`
   (copy Jorge's file as a template). Two optional fields control the
   home-page card:
   - `scheduledAt?: string` — ISO 8601 timestamp
     (e.g. `"2026-05-20T10:00:00-07:00"`). Cards with the closest time
     to "now" appear first. Omit → shown as `未排期 / TBD` and sorted
     to the end of the upcoming list.
   - `completed?: boolean` — set `true` after the interview is done.
     Completed candidates are pinned to the bottom of the list and
     visually dimmed.
4. Register the import in [`src/data/candidates.ts`](src/data/candidates.ts).

That's it — no component changes needed.

## Deploy

Workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
runs on every push to `main` / `master`:

1. In the repo on GitHub, go to **Settings → Pages → Build and deployment**
   and set **Source = GitHub Actions** (one-time).
2. Push to `main` — the workflow builds with
   `BASE_PATH=/${repo-name}/` and publishes `dist/` to Pages.
