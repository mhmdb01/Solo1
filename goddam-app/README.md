# قدّام (GODDAM)

Interactive learning platform for Algerian driving schools.

See `PLAN.md` for the full master plan and phase breakdown.

## Run

```bash
npm install
npm run dev
```

Then open the printed local URL (resize to phone width to see the intended layout).

## Build

```bash
npm run build
npm run preview
```

## Architecture

Engine ≠ content. All learning content (signs, scenarios, theory, exams, lessons)
lives in `src/data/*.json`. Components in `src/components`, `src/engine`, and
`src/pages` render from that data — new content should never require new code.
