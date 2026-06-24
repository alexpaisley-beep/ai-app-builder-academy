// Database seed for AI App Builder Academy.
//
// Seeds the first real course — "Set Up Your App Foundation" — into Postgres:
// one Course, its 6 Modules, and 4 real Lessons per module (with teaching
// content, "Ask AI this" prompts, completion checklists, and warnings).
//
// The course content is the single source of truth in `src/courseContent.mjs`
// and is shared with the frontend. That file is ESM (.mjs) and imports nothing
// browser-specific, so this CommonJS script loads it with a dynamic import.
// Icons are a presentation concern and are NOT stored in the database.
//
// Run with: npm run prisma:seed  (or `prisma migrate dev`, which runs it after
// applying migrations). The script is idempotent — re-running it updates the
// existing rows instead of creating duplicates — and it removes any other
// course so this one is the single, first course.

require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Turn a lesson title into a stable, URL-safe slug (lesson slugs are unique per
// module).
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set — cannot seed the database.');
  }

  // Shared, framework-agnostic course content (ESM module).
  const { course } = await import('../src/courseContent.mjs');

  // Upsert the course so re-running the seed is safe.
  const seededCourse = await prisma.course.upsert({
    where: { slug: course.slug },
    update: { title: course.title, description: course.description },
    create: { slug: course.slug, title: course.title, description: course.description }
  });

  // Make this the single, first course: remove any other course (cascades to
  // its modules and lessons).
  await prisma.course.deleteMany({ where: { slug: { not: course.slug } } });

  for (const [moduleIndex, module] of course.modules.entries()) {
    const seededModule = await prisma.module.upsert({
      where: { courseId_slug: { courseId: seededCourse.id, slug: module.slug } },
      update: {
        title: module.title,
        level: module.level,
        time: module.time,
        description: module.description,
        order: moduleIndex
      },
      create: {
        slug: module.slug,
        title: module.title,
        level: module.level,
        time: module.time,
        description: module.description,
        order: moduleIndex,
        courseId: seededCourse.id
      }
    });

    for (const [lessonIndex, lesson] of module.lessons.entries()) {
      const lessonSlug = slugify(lesson.title);
      const data = {
        title: lesson.title,
        description: lesson.description,
        time: lesson.time,
        order: lessonIndex,
        content: lesson.content,
        aiPrompts: lesson.aiPrompts ?? [],
        checklist: lesson.checklist ?? [],
        warnings: lesson.warnings ?? []
      };
      await prisma.lesson.upsert({
        where: { moduleId_slug: { moduleId: seededModule.id, slug: lessonSlug } },
        update: data,
        create: { slug: lessonSlug, moduleId: seededModule.id, ...data }
      });
    }

    // Drop any stale lessons from a previous seed that are no longer in content.
    const keepSlugs = module.lessons.map((l) => slugify(l.title));
    await prisma.lesson.deleteMany({
      where: { moduleId: seededModule.id, slug: { notIn: keepSlugs } }
    });
  }

  const [courseCount, moduleCount, lessonCount] = await Promise.all([
    prisma.course.count(),
    prisma.module.count(),
    prisma.lesson.count()
  ]);

  console.log(
    `Seed complete: ${courseCount} course(s), ${moduleCount} module(s), ${lessonCount} lesson(s).`
  );
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
