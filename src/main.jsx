import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrainCircuit,
  Code2,
  Rocket,
  GitBranch,
  Server,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  BookOpen,
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';
import './styles.css';

const modules = [
  {
    icon: BrainCircuit,
    title: 'Think Like an Architect',
    level: 'Foundation',
    time: '42 min',
    description: 'Turn a raw idea into screens, data models, user flows, and buildable milestones.'
  },
  {
    icon: Terminal,
    title: 'Prompt Like a Builder',
    level: 'AI Workflow',
    time: '55 min',
    description: 'Use Claude and ChatGPT to inspect codebases, plan changes, write tests, and avoid hallucinated garbage.'
  },
  {
    icon: GitBranch,
    title: 'GitHub Without Melting',
    level: 'Workflow',
    time: '38 min',
    description: 'Clone, branch, commit, push, open PRs, and recover when Git starts acting like a cursed filing cabinet.'
  },
  {
    icon: Server,
    title: 'Deploy With Railway',
    level: 'Deployment',
    time: '47 min',
    description: 'Ship a backend, configure environment variables, connect Postgres, and read logs like an adult.'
  },
  {
    icon: ShieldCheck,
    title: 'Auth, Payments, and Guardrails',
    level: 'Real Apps',
    time: '61 min',
    description: 'Build the parts that make software real: user access, Stripe flows, approvals, audit logs, and safety checks.'
  },
  {
    icon: Rocket,
    title: 'Launch the MVP',
    level: 'Shipping',
    time: '50 min',
    description: 'Cut scope, test the core path, deploy, collect feedback, and avoid turning your MVP into a museum.'
  }
];

const playbook = [
  'Define the user and the painful workflow',
  'Sketch the data model before touching code',
  'Make Claude map the repo, then verify manually',
  'Build one vertical slice end-to-end',
  'Add logs before production makes you regret everything',
  'Deploy early, then iterate like a sane person'
];

const tools = [
  { name: 'Claude', use: 'Codebase reasoning, refactors, tests, debugging plans' },
  { name: 'ChatGPT', use: 'Architecture planning, prompts, product strategy, explanations' },
  { name: 'GitHub', use: 'Version control, issues, PRs, collaboration' },
  { name: 'Railway', use: 'Deployments, env vars, logs, managed Postgres' },
  { name: 'Stripe', use: 'Payments, subscriptions, customer billing state' },
  { name: 'Supabase', use: 'Postgres, auth patterns, storage, SQL inspection' }
];

function App() {
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  return (
    <main>
      <nav className="nav">
        <div className="brand">
          <div className="logo"><Code2 size={22} /></div>
          <span>AI App Builder Academy</span>
        </div>
        <div className="navLinks">
          <a href="#modules">Modules</a>
          <a href="#playbook">Playbook</a>
          <a href="#tools">Tools</a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroText">
          <div className="pill">
            <Zap size={16} />
            Build apps with AI leverage, not 2014 tutorial trauma
          </div>
          <h1>Learn how to build real apps in the AI era.</h1>
          <p>
            A practical platform for founders, beginners, and chaotic little ship-machines who want to turn ideas into deployed products using AI, GitHub, Railway, payments, auth, and actual architecture.
          </p>
          <div className="heroButtons">
            <button className="primary">
              Start the roadmap <ArrowRight size={18} />
            </button>
            <button className="secondary">View curriculum</button>
          </div>
        </div>

        <div className="heroCard">
          <div className="cardHeader">
            <BookOpen size={20} />
            <span>Current track</span>
          </div>
          <h3>{selectedModule.title}</h3>
          <p>{selectedModule.description}</p>
          <div className="progressWrap">
            <div className="progressMeta">
              <span>{selectedModule.level}</span>
              <span>{selectedModule.time}</span>
            </div>
            <div className="progressBar">
              <div className="progressFill"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="modules">
        <div className="sectionHeader">
          <p>Curriculum</p>
          <h2>From idea to deployed app.</h2>
        </div>

        <div className="moduleGrid">
          {modules.map((module) => {
            const Icon = module.icon;
            const active = selectedModule.title === module.title;
            return (
              <button
                key={module.title}
                className={`moduleCard ${active ? 'active' : ''}`}
                onClick={() => setSelectedModule(module)}
              >
                <Icon size={24} />
                <div>
                  <span>{module.level} · {module.time}</span>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="split" id="playbook">
        <div>
          <p className="eyebrow">The method</p>
          <h2>Build like AI exists. Because, tragically for gatekeepers, it does.</h2>
          <p className="muted">
            The point is not to avoid learning. The point is to learn the parts that matter faster: architecture, debugging, product judgment, system boundaries, and shipping.
          </p>
        </div>
        <div className="checklist">
          {playbook.map((item) => (
            <div className="checkItem" key={item}>
              <CheckCircle2 size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="tools">
        <div className="sectionHeader">
          <p>Tool stack</p>
          <h2>The extensions and platforms students learn.</h2>
        </div>

        <div className="toolGrid">
          {tools.map((tool) => (
            <div className="toolCard" key={tool.name}>
              <Layers size={22} />
              <h3>{tool.name}</h3>
              <p>{tool.use}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
