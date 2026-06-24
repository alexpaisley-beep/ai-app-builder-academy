// Prisma 7 configuration.
//
// Prisma 7 moved connection-string and CLI settings out of the schema and into
// this file. In particular:
//   - `directUrl` is no longer a `datasource` property in schema.prisma; the
//     direct (non-pooled) connection used by migration/introspection commands
//     is configured here as `datasource.url`.
//   - The runtime connection used by the app is established separately, through
//     the driver adapter in `server/db.js` (Prisma 7 ships a WASM query
//     compiler and requires a driver adapter instead of a bundled engine).
//
// Prisma 7 no longer auto-loads `.env`, so we load it explicitly for local CLI
// use. In production (e.g. Railway) the variables come from the environment.
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Migrations/introspection use the direct connection when available, falling
// back to the pooled URL for single-connection setups. `env()` from
// `prisma/config` throws on a missing variable, so we read process.env directly
// to allow the fallback.
const migrationUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: migrationUrl,
  },
  migrations: {
    seed: 'node prisma/seed.js',
  },
});
