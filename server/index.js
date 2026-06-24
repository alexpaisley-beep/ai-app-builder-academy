// Minimal Express server for AI App Builder Academy.
//
// Responsibilities (kept deliberately small):
//   1. Serve the built Vite app from `dist/`.
//   2. Expose GET /api/health/db, which checks database connectivity.
//
// No auth, payments, course persistence, migrations, or UI data calls live
// here yet — this only establishes that the app can talk to the database.

const path = require('path');
const express = require('express');
const { getPrisma } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const distDir = path.resolve(__dirname, '..', 'dist');

// Database health check. Runs a trivial query and reports whether the database
// is reachable. Any failure (client not generated, no DATABASE_URL, connection
// refused, query error) is reported uniformly as an unavailable database.
app.get('/api/health/db', async (req, res) => {
  try {
    const prisma = getPrisma();
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true });
  } catch (err) {
    console.error('[health/db] database check failed:', err.message);
    res.status(503).json({ ok: false, error: 'database_unavailable' });
  }
});

// Serve the production build. `npm run build` must have produced `dist/`.
app.use(express.static(distDir));

// SPA fallback: send index.html for any non-API GET so client-side routing
// (e.g. /modules/:slug) works on direct navigation / refresh.
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
