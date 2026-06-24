// Database seed for AI App Builder Academy.
//
// Inserts the course content that currently lives hardcoded in the React app
// (`src/data.js`) into Postgres: one Course, its Modules, and the placeholder
// Lessons shown on each module page. The frontend still reads its own hardcoded
// copy for now — this only proves the backend can store and read the content.
//
// The data is intentionally duplicated here rather than imported from
// `src/data.js`: that module imports `lucide-react` (browser/ESM icons) which
// cannot be required from a Node seed script. Icons are a presentation concern
// and are not stored in the database.
//
// Run with: npm run prisma:seed  (or `prisma migrate dev`, which runs it after
// applying migrations). The script is idempotent — re-running it updates the
// existing rows instead of creating duplicates.

require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// The single course that groups every module today.
const course = {
  slug: 'ai-app-builder-academy',
  title: 'AI App Builder Academy',
  description:
    'Learn to build and ship real apps using AI as leverage — from architecture to deployment.'
};

// Modules, mirrored from src/data.js (icons omitted — they are a frontend concern).
const modules = [
  {
    slug: 'think-like-an-architect',
    title: 'Think Like an Architect',
    level: 'Foundation',
    time: '42 min',
    description:
      'Turn a raw idea into screens, data models, user flows, and buildable milestones.'
  },
  {
    slug: 'prompt-like-a-builder',
    title: 'Prompt Like a Builder',
    level: 'AI Workflow',
    time: '55 min',
    description:
      'Use Claude and ChatGPT to inspect codebases, plan changes, write tests, and avoid hallucinated garbage.'
  },
  {
    slug: 'github-without-melting',
    title: 'GitHub Without Melting',
    level: 'Workflow',
    time: '38 min',
    description:
      'Clone, branch, commit, push, open PRs, and recover when Git starts acting like a cursed filing cabinet.'
  },
  {
    slug: 'deploy-with-railway',
    title: 'Deploy With Railway',
    level: 'Deployment',
    time: '47 min',
    description:
      'Ship a backend, configure environment variables, connect Postgres, and read logs like an adult.'
  },
  {
    slug: 'auth-payments-and-guardrails',
    title: 'Auth, Payments, and Guardrails',
    level: 'Real Apps',
    time: '61 min',
    description:
      'Build the parts that make software real: user access, Stripe flows, approvals, audit logs, and safety checks.'
  },
  {
    slug: 'launch-the-mvp',
    title: 'Launch the MVP',
    level: 'Shipping',
    time: '50 min',
    description:
      'Cut scope, test the core path, deploy, collect feedback, and avoid turning your MVP into a museum.'
  }
];

// Placeholder lessons shown on each module page (from src/data.js). The same set
// is attached to every module until real per-module content lands.
const placeholderLessons = [
  {
    title: 'Orientation & outcomes',
    time: '8 min',
    description:
      'What you will be able to build by the end of this module, and how to follow along.'
  },
  {
    title: 'Core concepts walkthrough',
    time: '14 min',
    description:
      'The mental models and vocabulary you need before touching any code.'
  },
  {
    title: 'Hands-on build',
    time: '18 min',
    description: 'Apply the concepts to a real vertical slice, one step at a time.'
  },
  {
    title: 'Ship it & reflect',
    time: '10 min',
    description:
      'Wire up the finishing touches, review the result, and lock in the workflow.'
  }
];

// Turn a lesson title into a stable, URL-safe slug (lesson slugs are unique per
// module, so the placeholder set can be reused across modules).
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

  // Upsert the course so re-running the seed is safe.
  const seededCourse = await prisma.course.upsert({
    where: { slug: course.slug },
    update: { title: course.title, description: course.description },
    create: course
  });

  for (const [moduleIndex, module] of modules.entries()) {
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

    for (const [lessonIndex, lesson] of placeholderLessons.entries()) {
      const lessonSlug = slugify(lesson.title);
      await prisma.lesson.upsert({
        where: {
          moduleId_slug: { moduleId: seededModule.id, slug: lessonSlug }
        },
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
