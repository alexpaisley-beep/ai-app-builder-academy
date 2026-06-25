// Frontend adapter over the shared, pure-data course content.
//
// `courseContent.mjs` is the single source of truth (also consumed by the Node
// seed script). It carries no React/lucide imports, so here we resolve each
// module's `icon` string to an actual lucide component for rendering.

import {
  Compass,
  Users,
  Layers,
  Wrench,
  GitBranch,
  Rocket,
  BrainCircuit
} from 'lucide-react';
import {
  firstCourse,
  firstModule,
  allModules,
  getModule as getModuleData
} from './courseContent.mjs';

// Map the string icon names used in courseContent.mjs to lucide components.
// Anything missing falls back to a sensible default so the UI never crashes.
const ICONS = {
  Compass,
  Users,
  Layers,
  Wrench,
  GitBranch,
  Rocket
};

function withIcon(module) {
  return { ...module, icon: ICONS[module.icon] || BrainCircuit };
}

// Modules of the first real course, in order, with resolved icon components.
export const modules = firstCourse.modules.map(withIcon);

// The first real course/module — drives the homepage hero.
export const course = firstCourse;
export const heroModule = withIcon(firstModule);

export function getModule(slug) {
  const module = getModuleData(slug);
  return module ? withIcon(module) : undefined;
}

// Re-export the interactive Lesson 1 data and shared helpers.
export {
  appTypes,
  lessonPrompts,
  lessonChecklist,
  getCourse
} from './courseContent.mjs';

// Static homepage copy (presentation only — not stored in the database).
export const playbook = [
  'Decide what you are building before you build it',
  'Name one real user and the workflow that hurts them',
  'Sketch the screens and data model on paper first',
  'Pick a boring, reliable stack and skip the shiny extras',
  'Cut scope to one vertical slice you can finish',
  'Use AI to plan, draft, and debug — then verify it yourself'
];

export const tools = [
  { name: 'Claude', use: 'Codebase reasoning, refactors, tests, debugging plans' },
  { name: 'ChatGPT', use: 'Architecture planning, prompts, product strategy, explanations' },
  { name: 'GitHub', use: 'Version control, issues, PRs, collaboration' },
  { name: 'Railway', use: 'Deployments, env vars, logs, managed Postgres' },
  { name: 'Stripe', use: 'Payments, subscriptions, customer billing state' },
  { name: 'Supabase', use: 'Postgres, auth patterns, storage, SQL inspection' }
];
