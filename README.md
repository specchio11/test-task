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
│   ├── candidates/
│   │   └── <id>/                    # one folder per candidate (static assets)
│   │       ├── index.html           # redirect shim → React agenda overview
│   │       ├── selfIntro/...
│   │       ├── technicalQuestions/...
│   │       ├── candidateQuestions/...
│   │       └── printNote/...
│   └── coding-problems/             # shared problem library (reused across candidates)
│       └── <problem-id>/            # e.g. inverse-function, matrix-multiplication
│           ├── interview-guide.html # canonical interviewer guide
│           ├── starter-template.{py,cpp,cs,ts,java}
│           ├── interview-algorithm-question.md (optional)
│           └── problem-display/{conversational,formal}.html (optional)
└── src/
    ├── main.tsx
    ├── App.tsx                      # HashRouter
    ├── styles/
    │   ├── global.css               # Home + reset
    │   └── agenda.css               # per-candidate agenda overview (verbatim port)
    ├── data/
    │   ├── types.ts                 # CandidateConfig + AgendaSection (with optional `problem` field)
    │   ├── candidates.ts            # registry (import + list all configs here)
    │   └── asset.ts                 # candidateAsset / sectionAsset → BASE_URL-safe URL
    ├── candidates/
    │   └── <id>.ts                  # one config-only file per candidate
    ├── components/                  # AgendaNavbar / QuickPanel / OverviewTable / …
    └── pages/                       # Home, CandidateAgenda, NotFound
```

## Adding a new candidate

1. Pick the next available `order` number by looking at
   `public/candidates/` — folders are named `<order>-<id>/`, so just
   increment past the highest currently-active one. (Order `0` is
   reserved for unscheduled candidates.)
2. Create the static guide pages under
   `public/candidates/<order>-<new-id>/{selfIntro,technicalQuestions,candidateQuestions,printNote}/`
   (mirror an existing candidate's layout — sub-page filenames
   `interview-guide.html`). For coding sections, do **not** create a
   per-candidate `codingTest/` folder — instead, point the section at a
   shared problem in `public/coding-problems/<problem-id>/` by setting
   `problem: '<problem-id>'` on the section config (see step 4). Add a
   new problem folder there if none of the existing ones fit.
3. Copy any existing candidate's `index.html` redirect shim to
   `public/candidates/<order>-<new-id>/index.html` and change the hash
   route to `#/candidate/<new-id>`. Keep `../../` as the relative depth
   (one fewer level than a completed candidate under `_completed/`).
4. Create `src/candidates/<new-id>.ts` exporting a `CandidateConfig`
   (copy an existing candidate's file as a template). Required:
   - `id` — URL slug, must match the folder's `<id>` suffix.
   - `order` — chronological sequence number used for the folder name.
   - `scheduledAt?: string` — ISO 8601 timestamp
     (e.g. `"2026-05-20T10:00:00-07:00"`). Cards with the closest time
     to "now" appear first. Omit → shown as `未排期 / TBD` and sorted
     to the end of the upcoming list.
   - `completed?: boolean` — set `true` after the interview is done.
     Completed candidates are pinned to the bottom of the list,
     visually dimmed, and (in the next deploy) their folder should be
     moved into `public/candidates/_completed/<order>-<id>/` so the
     top-level listing only shows upcoming interviews.
5. Register the import in [`src/data/candidates.ts`](src/data/candidates.ts).

That's it — no component changes needed.

## Deploy

Workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
runs on every push to `main` / `master`:

1. In the repo on GitHub, go to **Settings → Pages → Build and deployment**
   and set **Source = GitHub Actions** (one-time).
2. Push to `main` — the workflow builds with
   `BASE_PATH=/${repo-name}/` and publishes `dist/` to Pages.
