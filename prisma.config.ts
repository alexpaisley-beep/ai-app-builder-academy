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
import { execFileSync } from 'node:child_process';

// Migration datasource resolution.
//
// DIRECT_URL is the PREFERRED connection for `prisma migrate deploy` /
// introspection: it is the direct, non-pooled Postgres connection, which is
// what Prisma's migration engine expects (it acquires advisory locks and runs
// DDL that transaction-pooled connections don't reliably support).
//
// DATABASE_URL FALLBACK is allowed for this app because the current direct
// Supabase host (db.<supabase-ref>.supabase.co:5432) is NOT reachable from our
// CLI environment (Railway CLI / local) — Supabase no longer exposes that
// direct host over IPv4, so `prisma migrate deploy` fails with
//   P1001: Can't reach database server at db.<supabase-ref>.supabase.co:5432
// even though the runtime DATABASE_URL is reachable. To keep migrations
// working we therefore use DIRECT_URL only when it is present AND actually
// reachable, and otherwise fall back to DATABASE_URL.
//
// DATABASE_URL points at Supabase's session pooler (port 5432, one connection
// per client session). For this simple, single initial migration the session
// pooler behaves like a direct connection — it supports advisory locks and DDL
// — so it is safe to migrate against here.
//
// `env()` from `prisma/config` throws on a missing variable, so we read
// process.env directly to allow the fallback.
const migrationUrl = resolveMigrationUrl();

function resolveMigrationUrl(): string | undefined {
  const direct = process.env.DIRECT_URL;
  const pooled = process.env.DATABASE_URL;

  if (direct && isReachable(direct)) {
    return direct;
  }
  return pooled;
}

// Best-effort synchronous TCP reachability probe.
//
// `defineConfig` needs the datasource URL synchronously at config-load time,
// so we can't await an async socket. We run a short child-process connect
// attempt instead and treat any failure (DNS, connection refused, timeout) as
// "not reachable" so the caller falls back to DATABASE_URL. This only checks
// TCP reachability — exactly the layer that produces Prisma's P1001 — and does
// not attempt authentication.
function isReachable(connectionString: string): boolean {
  let host: string;
  let port: number;
  try {
    const url = new URL(connectionString);
    host = url.hostname;
    port = Number(url.port) || 5432;
  } catch {
    return false;
  }

  try {
    execFileSync(
      process.execPath,
      [
        '-e',
        "const net=require('net');" +
          'const s=net.connect({host:process.argv[1],port:Number(process.argv[2])});' +
          's.setTimeout(2000);' +
          "s.on('connect',()=>{s.destroy();process.exit(0)});" +
          "s.on('timeout',()=>{s.destroy();process.exit(1)});" +
          "s.on('error',()=>process.exit(1));",
        host,
        String(port),
      ],
      { stdio: 'ignore', timeout: 5000 },
    );
    return true;
  } catch {
    return false;
  }
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: migrationUrl,
  },
  migrations: {
    seed: 'node prisma/seed.js',
  },
});
