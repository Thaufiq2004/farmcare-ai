# FarmCare AI

FarmCare AI is a Bangladesh-aware agriculture companion for crop, livestock, and fisheries decisions.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/farmcare-ai` — the judge-facing React + Vite web app
- `artifacts/api-server` — shared API service reserved for production data integrations
- `docs/system-design.md` — product architecture, domain model, and delivery roadmap
- `lib/api-spec/openapi.yaml` — API contract source of truth when server-backed features are added

## Architecture decisions

- The first release is a self-contained, seeded demo so a judge can evaluate the complete experience without credentials or external APIs.
- Domain modules are intentionally separated into crop, livestock, fisheries, market, and assistant experiences behind one shared shell.
- Bangladesh context is a first-class product concern: district-level weather framing, Bangla labels, BDT pricing, local crops, and low-bandwidth-friendly copy are built into the interaction model.
- The API server remains a clean seam for connecting weather, market, disease, and cooperative data after the judging MVP.

## Product

FarmCare AI gives a farmer or extension officer a single daily brief, actionable alerts, crop planning, livestock care tracking, pond health guidance, local market signals, and a multilingual field assistant. The UI includes realistic seeded demo data so every key path can be reviewed immediately.

## User preferences

- The user requested a reviewable, step-by-step build that can be completed quickly and committed to GitHub.

## Gotchas

- The app is served through the managed web preview workflow; do not start it with a root-level `pnpm dev`.
- Keep user-facing copy and future data integrations friendly to Bangla and intermittent connectivity.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
