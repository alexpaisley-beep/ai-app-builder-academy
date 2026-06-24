import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Code2,
  CheckCircle2,
  BookOpen,
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';
import { modules, playbook, tools } from './data';

function Home() {
  const navigate = useNavigate();
  const currentTrack = modules[0];

  // "Start the roadmap" jumps into the first module's detail page.
  const startRoadmap = () => navigate(`/modules/${modules[0].slug}`);

  // "View curriculum" scrolls down to the #modules section on this page.
  const viewCurriculum = () => {
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            <button className="primary" onClick={startRoadmap}>
              Start the roadmap <ArrowRight size={18} />
            </button>
            <button className="secondary" onClick={viewCurriculum}>
              View curriculum
            </button>
          </div>
        </div>

        <div className="heroCard">
          <div className="cardHeader">
            <BookOpen size={20} />
            <span>Current track</span>
          </div>
          <h3>{currentTrack.title}</h3>
          <p>{currentTrack.description}</p>
          <div className="progressWrap">
            <div className="progressMeta">
              <span>{currentTrack.level}</span>
              <span>{currentTrack.time}</span>
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
            return (
              <Link
                key={module.slug}
                className="moduleCard"
                to={`/modules/${module.slug}`}
              >
                <Icon size={24} />
                <div>
                  <span>{module.level} · {module.time}</span>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
              </Link>
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

export default Home;
