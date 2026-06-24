import {
  BrainCircuit,
  Terminal,
  GitBranch,
  Server,
  ShieldCheck,
  Rocket
} from 'lucide-react';

export const modules = [
  {
    slug: 'think-like-an-architect',
    icon: BrainCircuit,
    title: 'Think Like an Architect',
    level: 'Foundation',
    time: '42 min',
    description: 'Turn a raw idea into screens, data models, user flows, and buildable milestones.'
  },
  {
    slug: 'prompt-like-a-builder',
    icon: Terminal,
    title: 'Prompt Like a Builder',
    level: 'AI Workflow',
    time: '55 min',
    description: 'Use Claude and ChatGPT to inspect codebases, plan changes, write tests, and avoid hallucinated garbage.'
  },
  {
    slug: 'github-without-melting',
    icon: GitBranch,
    title: 'GitHub Without Melting',
    level: 'Workflow',
    time: '38 min',
    description: 'Clone, branch, commit, push, open PRs, and recover when Git starts acting like a cursed filing cabinet.'
  },
  {
    slug: 'deploy-with-railway',
    icon: Server,
    title: 'Deploy With Railway',
    level: 'Deployment',
    time: '47 min',
    description: 'Ship a backend, configure environment variables, connect Postgres, and read logs like an adult.'
  },
  {
    slug: 'auth-payments-and-guardrails',
    icon: ShieldCheck,
    title: 'Auth, Payments, and Guardrails',
    level: 'Real Apps',
    time: '61 min',
    description: 'Build the parts that make software real: user access, Stripe flows, approvals, audit logs, and safety checks.'
  },
  {
    slug: 'launch-the-mvp',
    icon: Rocket,
    title: 'Launch the MVP',
    level: 'Shipping',
    time: '50 min',
    description: 'Cut scope, test the core path, deploy, collect feedback, and avoid turning your MVP into a museum.'
  }
];

export function getModule(slug) {
  return modules.find((module) => module.slug === slug);
}

// Placeholder lessons shown on each module detail page until real content lands.
export const placeholderLessons = [
  {
    title: 'Orientation & outcomes',
    time: '8 min',
    description: 'What you will be able to build by the end of this module, and how to follow along.'
  },
  {
    title: 'Core concepts walkthrough',
    time: '14 min',
    description: 'The mental models and vocabulary you need before touching any code.'
  },
  {
    title: 'Hands-on build',
    time: '18 min',
    description: 'Apply the concepts to a real vertical slice, one step at a time.'
  },
  {
    title: 'Ship it & reflect',
    time: '10 min',
    description: 'Wire up the finishing touches, review the result, and lock in the workflow.'
  }
];

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
  { name: 'Stripe', use: 'Payments, subscriptions, customer billing state' },
  { name: 'Supabase', use: 'Postgres, auth patterns, storage, SQL inspection' }
];
