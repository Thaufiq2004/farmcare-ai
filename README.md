# FarmCare AI

FarmCare AI is a Bangladesh-aware AI agriculture companion for crop, livestock,
and fisheries decisions.

## Project areas

- Web app: `artifacts/farmcare-ai`
- Slide deck: `artifacts/farmcare-ai-deck`
- Architecture: `docs/system-design.md`
- Docker deployment: `docs/docker-deployment.md`

## Run with Docker

From the repository root:

```bash
docker compose up --build -d
```

Open http://localhost:8080. To stop the app:

```bash
docker compose down
```

To share a locally running container publicly without opening router ports,
install Cloudflare Tunnel (`cloudflared`) and run:

```bash
cloudflared tunnel --url http://localhost:8080
```

This prints a temporary public URL. Your device and tunnel must remain online
for the URL to work. GitHub stores the source and Docker configuration but does
not run the container.

## Features

- Crop care, livestock health, and fisheries pond monitoring
- Bangladesh context: districts, upazilas, Bangla-friendly cues, and BDT market signals
- Daily farm brief, prioritised alerts, field log, local market intelligence, and AI assistant
- Responsive live web preview and a six-slide project presentation

## Run without Docker

This is a pnpm workspace. Run:

```bash
pnpm install
pnpm --filter @workspace/farmcare-ai run dev
```