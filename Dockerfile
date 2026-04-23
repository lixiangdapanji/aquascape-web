# syntax=docker/dockerfile:1.7
#
# @aquascape/web — polyrepo production image.
#
# Stages:
#   1. deps    — installs from GitHub Packages (@aquascape/* scoped).
#   2. build   — compiles the Next.js standalone bundle.
#   3. runner  — minimal image with standalone output only.
#
# Build with:
#   docker build --secret id=GITHUB_TOKEN,env=GITHUB_TOKEN .

# --------------------------------------------------------------------- deps
FROM node:22-slim AS deps
WORKDIR /app

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

COPY package.json ./

RUN --mount=type=secret,id=GITHUB_TOKEN \
    --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    printf "@aquascape:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=%s\n" \
      "$(cat /run/secrets/GITHUB_TOKEN)" > /root/.npmrc && \
    pnpm install --no-frozen-lockfile

# --------------------------------------------------------------------- build
FROM node:22-slim AS build
WORKDIR /app

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# --------------------------------------------------------------------- runner
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
