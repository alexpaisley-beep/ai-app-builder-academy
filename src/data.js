import {
  Lightbulb,
  GitBranch,
  FolderTree,
  Database,
  Rocket,
  CheckCircle2
} from 'lucide-react';
import { course, appIdeaCategories } from './courseContent.mjs';

// Icons are a frontend-only concern: map the icon name stored in the shared
// content module to a lucide component. Falls back to Lightbulb if unknown.
const ICONS = {
  Lightbulb,
  GitBranch,
  FolderTree,
  Database,
  Rocket,
  CheckCircle2
};

export { course, appIdeaCategories };

// First (and currently only) course's modules, with icons attached. Used by the
// home page curriculum grid and as the local fallback for the detail page when
// the API is unavailable.
export const modules = course.modules.map((module) => ({
  ...module,
  icon: ICONS[module.iconName] || Lightbulb
}));

export function getModule(slug) {
  return modules.find((module) => module.slug === slug);
}

// Slug of the first module — where the "choose your app idea" picker appears.
export const firstModuleSlug = modules[0]?.slug;

export const playbook = [
  'Define the user and the painful workflow',
  'Sketch the data model before touching code',
  'Make Claude map the repo, then verify manually',
  'Build one vertical slice end-to-end',
  'Add logs before production makes you regret everything',
  'Deploy early, then iterate like a sane person'
];

export const tools = [
  { name: 'Claude', use: 'Codebase reasoning, refactors, tests, debugging plans' },
  { name: 'ChatGPT', use: 'Architecture planning, prompts, product strategy, explanations' },
  { name: 'GitHub', use: 'Version control, issues, PRs, collaboration' },
  { name: 'Railway', use: 'Deployments, env vars, logs, managed Postgres' },
  { name: 'Supabase', use: 'Postgres, auth patterns, storage, SQL inspection' },
  { name: 'Neon', use: 'Serverless Postgres with generous free tiers' }
];
