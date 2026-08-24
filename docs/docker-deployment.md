# Docker deployment

This repository includes a production-style Docker image for the FarmCare AI
frontend. The image builds the Vite app and serves the resulting static files
with Nginx, including client-side route fallback and a health check.

## Run locally

From the repository root:

```bash
docker compose up --build -d
```

Open http://localhost:8080. Check the container with:

```bash
docker compose ps
curl http://localhost:8080/healthz
```

Stop it with:

```bash
docker compose down
```

## Share it temporarily with everyone

Docker exposes the app on port 8080 on your device. To make it reachable from
the public internet without opening router ports, install
[cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/)
and run:

```bash
cloudflared tunnel --url http://localhost:8080
```

Cloudflare will print a temporary public `trycloudflare.com` URL. Keep both the
Docker Compose process and the tunnel process running. This URL changes when
the temporary tunnel restarts.

## Persistent public URL

For a stable address, create a named Cloudflare Tunnel and point its published
application at `http://localhost:8080`. Keep the tunnel credential outside the
repository; never commit it to GitHub. A small VPS or managed container host
is a better choice if the app must stay online when your computer is off.

## Important limitation

GitHub stores the Dockerfile and source code, but GitHub does not run this
container or provide a permanent web server for it. Public access requires
your computer to remain online, router port forwarding with HTTPS, a tunnel,
or deployment to a hosting provider.