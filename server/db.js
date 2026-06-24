// Server-only Prisma client (singleton).
//
// IMPORTANT: This module must NEVER be imported by frontend/browser code.
// It instantiates PrismaClient, which only runs in Node and would leak the
// database connection string into the client bundle. The React app under
// `src/` must reach the database exclusively through the HTTP API in
// `server/index.js`.
//
// The PrismaClient is created lazily and cached on globalThis so that a single
// instance is reused across the process (and across dev hot-reloads). The
// `require('@prisma/client')` is deferred until first use: before
// `prisma generate` has run the generated client does not exist, and we want
// the server to still boot and report an unhealthy database rather than crash.

const globalForPrisma = globalThis;

function getPrisma() {
  if (!globalForPrisma.__prismaClient) {
    const { PrismaClient } = require('@prisma/client');
    globalForPrisma.__prismaClient = new PrismaClient();
  }
  return globalForPrisma.__prismaClient;
}

module.exports = { getPrisma };
