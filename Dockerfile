# syntax=docker/dockerfile:1.7
#
# @aquascape/web — production image.
#
# Multi-stage:
#   1. `deps`    installs the monorepo with pnpm.
#   2. `build`   compiles the Next.js standalone bundle for @aquascape/web.
#   3. `runner`  ships only the standalone output + static assets.
#
# The repo uses pnpm workspaces, so we copy the full workspace manifest set
# into the deps stage and run a single `pnpm install` from the root. The build
# stage then runs `pnpm --filter @aquascape/web build`.

# --------------------------------------------------------------------- deps
FROM node:22-slim AS deps
WORKDIR /repo

# pnpm via corepack (bundled with Node 22).
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Workspace manifests — anything pnpm needs to resolve the graph.
COPY pnpm-workspace.yaml package.json .npmrc ./
COPY tsconfig.base.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/mobile/package.json ./apps/mobile/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/data/package.json ./packages/data/package.json
COPY packages/render/package.json ./packages/render/package.json
COPY packages/sim/package.json ./packages/sim/package.json
COPY infra/package.json ./infra/package.json

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --no-frozen-lockfile --ignore-scripts

# --------------------------------------------------------------------- build
FROM node:22-slim AS build
WORKDIR /repo
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

COPY --from=deps /repo /repo
COPY apps/web ./apps/web
COPY packages/ui ./packages/ui
COPY packages/data ./packages/data
COPY packages/render ./packages/render
COPY packages/sim ./packages/sim

RUN pnpm --filter @aquascape/web build

# --------------------------------------------------------------------- runner
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user.
RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

# Next 15 standalone output.
COPY --from=build --chown=nextjs:nodejs /repo/apps/web/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=nextjs:nodejs /repo/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
