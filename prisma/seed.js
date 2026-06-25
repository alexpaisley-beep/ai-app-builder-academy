// Database seed for AI App Builder Academy.
//
// Seeds the REAL course content from the single source of truth in
// `src/courseContent.mjs` into Postgres: Courses, their Modules, and the Lessons
// for each module (including the interactive first lesson). The same module is
// imported by the React frontend, so the database and UI never drift apart.
//
// `courseContent.mjs` is pure data (no lucide-react / React imports), so it is
// safe to load from Node. It is ESM, so we load it via dynamic import().
//
// The seed is idempotent: re-running it upserts existing rows. It also REMOVES
// stale courses (and, via cascade, their modules/lessons) that are no longer in
// the source content — this clears the old placeholder course
// ("AI App Builder Academy" / "Think Like an Architect" etc.).
//
// Run with: npm run prisma:seed.

require('dotenv/config');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Turn a lesson title into a stable, URL-safe fallback slug (lessons usually
// carry their own slug; this only runs if one is missing).
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set — cannot seed the database.');
  }

  // Load the shared content (ESM) from the frontend source of truth.
  const contentUrl = pathToFileURL(
    path.resolve(__dirname, '..', 'src', 'courseContent.mjs')
  ).href;
  const { courses } = await import(contentUrl);

  const keepCourseSlugs = courses.map((course) => course.slug);

  // Remove any course not present in the source content (old placeholders).
  // Module/Lesson rows cascade-delete with their course.
  const removed = await prisma.course.deleteMany({
    where: { slug: { notIn: keepCourseSlugs } }
  });
  if (removed.count > 0) {
    console.log(`Removed ${removed.count} stale course(s) not in source content.`);
  }

  for (const [courseIndex, course] of courses.entries()) {
    const seededCourse = await prisma.course.upsert({
      where: { slug: course.slug },
      update: { title: course.title, description: course.description },
      create: {
        slug: course.slug,
        title: course.title,
        description: course.description
      }
    });

    const moduleSlugs = course.modules.map((module) => module.slug);

    // Drop modules that no longer exist in this course (cascades to lessons).
    await prisma.module.deleteMany({
      where: { courseId: seededCourse.id, slug: { notIn: moduleSlugs } }
    });

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

      const lessons = module.lessons || [];
      const lessonSlugs = lessons.map((lesson) => lesson.slug || slugify(lesson.title));

      // Drop lessons that no longer exist in this module.
      await prisma.lesson.deleteMany({
        where: { moduleId: seededModule.id, slug: { notIn: lessonSlugs } }
      });

      for (const [lessonIndex, lesson] of lessons.entries()) {
        const lessonSlug = lesson.slug || slugify(lesson.title);
        await prisma.lesson.upsert({
          where: { moduleId_slug: { moduleId: seededModule.id, slug: lessonSlug } },
          update: {
            title: lesson.title,
            description: lesson.description,
            time: lesson.time,
            order: lessonIndex
          },
          create: {
            slug: lessonSlug,
            title: lesson.title,
            description: lesson.description,
            time: lesson.time,
            order: lessonIndex,
            moduleId: seededModule.id
          }
        });
      }
    }

    void courseIndex;
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
