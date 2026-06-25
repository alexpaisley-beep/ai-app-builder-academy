// Single source of truth for AI App Builder Academy course content.
//
// This module is PURE DATA — it imports nothing (no lucide-react, no React) so
// it can be consumed by BOTH:
//   - the React frontend (src/data.js maps `icon` strings to lucide components)
//   - the Node seed script (prisma/seed.js imports it via dynamic import())
//
// Icons are referenced by string name only; they are a presentation concern and
// are resolved to components in the frontend. Nothing here touches the network.
//
// The first real course is "Set Up Your App Foundation" and its first module is
// "Choose What You're Building", whose first lesson is a fully interactive
// experience (the `interactive` lesson with `appTypes`, `prompts`, `checklist`).

// ---------------------------------------------------------------------------
// Lesson 1 interactive data — "What kind of app do you want to build?"
// ---------------------------------------------------------------------------

// Selectable app types. Each carries the tailored guidance shown when picked.
export const appTypes = [
  {
    id: 'saas',
    label: 'SaaS tool',
    examples: 'A team dashboard, an invoicing tool, an analytics product, a scheduling SaaS.',
    needs: 'User accounts, a dashboard, a core "do the job" feature, and a billing path later.',
    database: 'Users, organizations/teams, and the main resource your tool manages (projects, invoices, reports).',
    integrations: 'Email (transactional), payments (later), and maybe a single external API your tool wraps.',
    avoid: 'Multi-tenant billing, granular roles/permissions, and white-labeling before anyone pays.',
    tip: 'Pick ONE workflow your tool makes 10x easier and build only that screen end-to-end first.'
  },
  {
    id: 'crm',
    label: 'CRM / business management app',
    examples: 'A simple client tracker, a sales pipeline, a small-agency project hub.',
    needs: 'Contact records, a list/table view, detail pages, notes, and basic status tracking.',
    database: 'Contacts, companies, deals/projects, notes, and activity/timeline entries.',
    integrations: 'Email sync and calendar are tempting — skip them. A CSV import is enough at first.',
    avoid: 'Email/calendar two-way sync, automations, and reporting dashboards before the core list works.',
    tip: 'Model the "contact" record first and make adding + viewing one contact feel great.'
  },
  {
    id: 'ai-assistant',
    label: 'AI assistant app',
    examples: 'A writing helper, a support-reply drafter, a "chat with your docs" tool.',
    needs: 'A chat/prompt input, a place to show responses, and saved conversations or history.',
    database: 'Conversations, messages, and (optionally) uploaded documents or sources.',
    integrations: 'An LLM API and, if "chat with docs", a way to store/retrieve document chunks.',
    avoid: 'Fine-tuning, multi-model routing, agents, and vector-DB infrastructure before a single prompt works.',
    tip: 'Hardcode one great prompt template first; make the round-trip work before adding options.'
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    examples: 'A local services marketplace, a niche goods marketplace, a freelancer board.',
    needs: 'Listings, a browse/search page, listing detail pages, and two user types (buyer/seller).',
    database: 'Users, listings, categories, and (later) orders/bookings and messages.',
    integrations: 'Payments and payouts eventually — but start with listings only, no money flow.',
    avoid: 'Escrow, payouts, ratings, disputes, and messaging before you have real listings to browse.',
    tip: 'Seed 10 fake listings and nail the browse → detail flow before any transactions.'
  },
  {
    id: 'booking',
    label: 'Booking / scheduling app',
    examples: 'A salon booking page, a tutor scheduler, a meeting-room reservation tool.',
    needs: 'A list of bookable things, available time slots, and a "confirm booking" flow.',
    database: 'Resources (people/rooms/services), availability/slots, and bookings.',
    integrations: 'Calendar sync and reminders are v2. Start with in-app availability only.',
    avoid: 'Timezone-perfect recurring availability, payments, and calendar sync on day one.',
    tip: 'Model availability as simple fixed slots first; real calendars come later.'
  },
  {
    id: 'finance',
    label: 'Finance / budgeting app',
    examples: 'A personal budget tracker, an expense splitter, a simple invoicing ledger.',
    needs: 'A way to add transactions, categorize them, and see a summary/total.',
    database: 'Accounts, transactions, categories, and budgets.',
    integrations: 'Bank-sync APIs (Plaid) are a trap early — start with manual entry or CSV import.',
    avoid: 'Bank connections, multi-currency, and forecasting before manual tracking feels solid.',
    tip: 'Make "add a transaction and see the total update" instant and satisfying first.'
  },
  {
    id: 'content',
    label: 'Content / course platform',
    examples: 'A course site, a paid newsletter, a docs/knowledge hub.',
    needs: 'Content items, an index/list page, a reader/detail page, and basic navigation.',
    database: 'Courses/posts, lessons/sections, and (later) enrollments or progress.',
    integrations: 'Payments and email come later; start by rendering content beautifully.',
    avoid: 'Drip schedules, memberships, gated payments, and progress tracking before content reads well.',
    tip: 'Get one lesson page rendering perfectly before you build the whole catalog.'
  },
  {
    id: 'productivity',
    label: 'Personal productivity app',
    examples: 'A to-do app, a habit tracker, a notes/second-brain tool.',
    needs: 'A fast capture input, a list view, and a way to mark things done/complete.',
    database: 'Items/tasks, lists/projects, and tags or due dates.',
    integrations: 'Skip sync, notifications, and integrations — local + simple persistence is plenty.',
    avoid: 'Reminders, recurring rules, collaboration, and sync before single-user capture feels fast.',
    tip: 'Optimize the "capture in under 2 seconds" path above everything else.'
  },
  {
    id: 'custom',
    label: 'Custom idea',
    examples: 'Whatever you have in mind — describe it in your own words below.',
    needs: 'Identify the ONE core action your user takes and the screen where they take it.',
    database: 'Start with the single most important record your app revolves around.',
    integrations: 'List every integration you imagine, then cut all but the one you truly need for v1.',
    avoid: 'Anything that is not directly part of your single core workflow.',
    tip: 'Write your idea as one sentence, then ask AI to help you find the smallest buildable slice.'
  }
];

// Copyable AI-leverage prompt templates. `{app}` is replaced at render time with
// the selected app type label (or the user's custom idea text).
export const lessonPrompts = [
  {
    id: 'mvp',
    title: 'Turn the idea into an MVP',
    template: 'Help me turn this app idea into a simple MVP: {app}. What is the smallest version I could build that is still useful?'
  },
  {
    id: 'screens-tables',
    title: 'Core screens, tables & features',
    template: 'For this app — {app} — list the core screens, the database tables I will need, and the first 3 features I should build.'
  },
  {
    id: 'integrations',
    title: 'Integrations to use and avoid',
    template: 'For this app — {app} — tell me what integrations I probably need and which ones I should avoid for v1 to stay simple.'
  },
  {
    id: 'architecture',
    title: 'Beginner-friendly architecture plan',
    template: 'Give me a beginner-friendly architecture plan for this app: {app}. Keep it simple and explain each part in plain language.'
  }
];

// End-of-lesson completion checklist (client-side only).
export const lessonChecklist = [
  { id: 'category', label: 'I chose an app category.' },
  { id: 'one-sentence', label: 'I wrote a one-sentence app idea.' },
  { id: 'who-for', label: 'I know who the app is for.' },
  { id: 'painful-workflow', label: 'I know the first painful workflow it solves.' },
  { id: 'ai-prompt', label: 'I have an AI prompt ready to plan the MVP.' }
];

// ---------------------------------------------------------------------------
// Course → Modules → Lessons
// ---------------------------------------------------------------------------

export const courses = [
  {
    slug: 'set-up-your-app-foundation',
    title: 'Set Up Your App Foundation',
    description:
      'Before you write a line of code: decide what you are building, who it is for, and the smallest version worth shipping. The groundwork that keeps an AI-built app from collapsing later.',
    modules: [
      {
        slug: 'choose-what-youre-building',
        icon: 'Compass',
        title: "Choose What You're Building",
        level: 'Foundation',
        time: '35 min',
        description:
          'Pick an app category, shape it into a one-sentence idea, and learn what your kind of app actually needs (and what to avoid building too early).',
        lessons: [
          {
            slug: 'what-kind-of-app',
            title: 'What kind of app do you want to build?',
            time: '15 min',
            description:
              'Choose an app type and get tailored guidance: examples, what it needs, likely data and integrations, traps to avoid, and a setup tip.',
            interactive: true
          },
          {
            slug: 'name-your-one-sentence-idea',
            title: 'Name your one-sentence app idea',
            time: '10 min',
            description:
              'Compress your app into a single clear sentence so every later decision has something to point back to.'
          },
          {
            slug: 'who-is-it-for',
            title: 'Who is it for, and what does it fix?',
            time: '10 min',
            description:
              'Name the specific person and the first painful workflow your app removes from their day.'
          }
        ]
      },
      {
        slug: 'define-your-core-user',
        icon: 'Users',
        title: 'Define Your Core User',
        level: 'Foundation',
        time: '25 min',
        description:
          'Get specific about who you are building for so you can say no to everything that does not serve them.',
        lessons: [
          {
            slug: 'pick-one-person',
            title: 'Pick one person, not "everyone"',
            time: '8 min',
            description: 'Narrow to a single user you can picture using your app every day.'
          },
          {
            slug: 'map-their-painful-day',
            title: 'Map their painful day',
            time: '9 min',
            description: 'Find the recurring frustration your app erases first.'
          },
          {
            slug: 'write-a-job-story',
            title: 'Write a job story',
            time: '8 min',
            description: '"When ___, I want to ___, so I can ___." The format that keeps scope honest.'
          }
        ]
      },
      {
        slug: 'map-screens-and-data',
        icon: 'Layers',
        title: 'Map Your Screens & Data',
        level: 'Architecture',
        time: '30 min',
        description:
          'Sketch the handful of screens and the core data model your app revolves around before any code exists.',
        lessons: [
          {
            slug: 'list-the-core-screens',
            title: 'List the core screens',
            time: '10 min',
            description: 'The 3-5 screens your user actually needs — nothing more.'
          },
          {
            slug: 'model-the-main-record',
            title: 'Model the main record',
            time: '10 min',
            description: 'Define the single most important table your whole app orbits.'
          },
          {
            slug: 'draw-the-happy-path',
            title: 'Draw the happy path',
            time: '10 min',
            description: 'Trace one user moving from entry to the core "win" without detours.'
          }
        ]
      },
      {
        slug: 'pick-your-stack-and-tools',
        icon: 'Wrench',
        title: 'Pick Your Stack & Tools',
        level: 'Setup',
        time: '28 min',
        description:
          'Choose a boring, reliable stack and the AI tools that will do the heavy lifting — without over-engineering.',
        lessons: [
          {
            slug: 'choose-a-boring-stack',
            title: 'Choose a boring, reliable stack',
            time: '9 min',
            description: 'Why the unexciting choice ships faster and breaks less.'
          },
          {
            slug: 'set-up-your-ai-tools',
            title: 'Set up your AI tools',
            time: '9 min',
            description: 'Get Claude and ChatGPT positioned as your build partners.'
          },
          {
            slug: 'avoid-tool-overload',
            title: 'Avoid tool overload',
            time: '10 min',
            description: 'The integrations and services to deliberately NOT add yet.'
          }
        ]
      },
      {
        slug: 'set-up-project-and-repo',
        icon: 'GitBranch',
        title: 'Set Up Your Project & Repo',
        level: 'Setup',
        time: '32 min',
        description:
          'Create the project, put it under version control, and get a clean starting point you can build on.',
        lessons: [
          {
            slug: 'create-the-project',
            title: 'Create the project',
            time: '11 min',
            description: 'Scaffold a runnable app you can open in the browser.'
          },
          {
            slug: 'put-it-in-git',
            title: 'Put it in Git',
            time: '11 min',
            description: 'Initialize a repo, make your first commit, and push it to GitHub.'
          },
          {
            slug: 'protect-your-secrets',
            title: 'Protect your secrets',
            time: '10 min',
            description: 'Environment variables and .gitignore so nothing private ships to GitHub.'
          }
        ]
      },
      {
        slug: 'plan-your-first-milestone',
        icon: 'Rocket',
        title: 'Plan Your First Build Milestone',
        level: 'Shipping',
        time: '26 min',
        description:
          'Turn your foundation into a tight first milestone: one vertical slice you can actually finish and show.',
        lessons: [
          {
            slug: 'define-the-vertical-slice',
            title: 'Define the vertical slice',
            time: '9 min',
            description: 'One feature, end to end, instead of every feature half-done.'
          },
          {
            slug: 'write-the-build-checklist',
            title: 'Write the build checklist',
            time: '9 min',
            description: 'Break the slice into small, AI-promptable steps.'
          },
          {
            slug: 'set-a-ship-date',
            title: 'Set a ship date',
            time: '8 min',
            description: 'A deadline small enough that scope stays honest.'
          }
        ]
      }
    ]
  }
];

// Convenience accessors -----------------------------------------------------

// Flat list of every module across all courses, in course+order sequence.
export const allModules = courses.flatMap((course) =>
  course.modules.map((module) => ({ ...module, courseSlug: course.slug, courseTitle: course.title }))
);

export function getCourse(slug) {
  return courses.find((course) => course.slug === slug);
}

export function getModule(slug) {
  return allModules.find((module) => module.slug === slug);
}

// The first real course/module — used by the homepage hero.
export const firstCourse = courses[0];
export const firstModule = firstCourse.modules[0];
