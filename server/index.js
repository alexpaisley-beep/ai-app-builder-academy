// Minimal Express server for AI App Builder Academy.
//
// Responsibilities (kept deliberately small):
//   1. Serve the built Vite app from `dist/`.
//   2. Expose GET /api/health/db, which checks database connectivity.
//   3. Expose read-only course content endpoints backed by Postgres:
//        GET /api/courses        — courses with their modules
//        GET /api/modules        — all modules
//        GET /api/modules/:slug  — a single module with its lessons
//
// These read APIs prove the backend can serve stored course content. The React
// app still renders its own hardcoded copy of this data for now — nothing in the
// UI calls these endpoints yet. No auth, payments, AI assistant, or user
// progress writes live here.

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

// --- Read-only course content API ---------------------------------------
//
// All handlers fail uniformly with 503 when the database is unreachable (client
// not generated, no DATABASE_URL, connection refused, query error), mirroring
// the health check above.

const DB_UNAVAILABLE = { error: 'database_unavailable' };

// GET /api/courses — every course with its modules (modules ordered).
app.get('/api/courses', async (req, res) => {
  try {
    const prisma = getPrisma();
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            slug: true,
            title: true,
            level: true,
            time: true,
            description: true,
            order: true
          }
        }
      }
    });
    res.json({ courses });
  } catch (err) {
    console.error('[GET /api/courses] failed:', err.message);
    res.status(503).json(DB_UNAVAILABLE);
  }
});

// GET /api/modules — all modules across courses, ordered, with their course.
app.get('/api/modules', async (req, res) => {
  try {
    const prisma = getPrisma();
    const modules = await prisma.module.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        level: true,
        time: true,
        description: true,
        order: true,
        course: { select: { slug: true, title: true } }
      }
    });
    res.json({ modules });
  } catch (err) {
    console.error('[GET /api/modules] failed:', err.message);
    res.status(503).json(DB_UNAVAILABLE);
  }
});

// GET /api/modules/:slug — a single module with its lessons (ordered).
// Returns 404 when no module matches the slug.
app.get('/api/modules/:slug', async (req, res) => {
  try {
    const prisma = getPrisma();
    const module = await prisma.module.findFirst({
      where: { slug: req.params.slug },
      select: {
        id: true,
        slug: true,
        title: true,
        level: true,
        time: true,
        description: true,
        order: true,
        course: { select: { slug: true, title: true } },
        lessons: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            time: true,
            order: true,
            content: true,
            aiPrompts: true,
            checklist: true,
            warnings: true
          }
        }
      }
    });
    if (!module) {
      res.status(404).json({ error: 'module_not_found' });
      return;
    }
    res.json({ module });
  } catch (err) {
    console.error('[GET /api/modules/:slug] failed:', err.message);
    res.status(503).json(DB_UNAVAILABLE);
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
