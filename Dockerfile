FROM node:22-bookworm-slim AS build

WORKDIR /workspace

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json tsconfig.base.json ./
COPY artifacts/farmcare-ai/package.json artifacts/farmcare-ai/package.json
COPY lib ./lib
COPY artifacts/farmcare-ai ./artifacts/farmcare-ai

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production
ENV PORT=4173
ENV BASE_PATH=/

RUN pnpm --filter @workspace/farmcare-ai run build

FROM nginx:1.27-alpine AS runtime

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/artifacts/farmcare-ai/dist/public /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]