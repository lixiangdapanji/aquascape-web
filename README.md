# @aquascape/web

Next.js 15 web client for aquascape-studio.

- Server components for marketing / content pages.
- Connect-ES client for realtime scape + sim calls to `aquascape-api`.
- Imports 3D scene from `@aquascape/render`, primitives from `@aquascape/ui`,
  and the plant catalog from `@aquascape/botany`.

## Proto submodule

```bash
git submodule update --init --recursive
pnpm install
pnpm buf:generate
```

`lib/_gen/` holds generated TS clients.

## Dev

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:50051 pnpm dev
```

## Deploy

Built by `aquascape-infra` as one of three Fargate services. This repo's CI
only validates; image push + service update happen from infra.

## Owner

app-agent.
