/**
 * Connect-ES client for aquascape-api.
 *
 * Generated service stubs live in `./_gen/` (after `pnpm buf:generate`).
 * This module is the single place the app creates a transport.
 */

import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";

// NOTE: import shape will be e.g.
//   import { AquascapeApi } from "./_gen/aquascape/v1/api_connect";
// after buf generate. We stub it for now to keep the type shape visible.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AquascapeApiServiceType = any;

const baseUrl =
  process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "http://localhost:50051";

const transport = createConnectTransport({
  baseUrl,
  useBinaryFormat: true,
});

/**
 * Shared client instance. Safe to import from server components
 * (fetch is edge-compatible in Next 15).
 */
export const apiClient = createClient<AquascapeApiServiceType>(null, transport);
