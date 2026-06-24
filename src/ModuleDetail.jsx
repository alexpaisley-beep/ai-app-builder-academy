import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, PlayCircle, Code2 } from 'lucide-react';
import { getModule, placeholderLessons } from './data';

function ModuleDetail() {
  const { slug } = useParams();
  const local = getModule(slug);

  // Render local data immediately so the page works even if the API is down,
  // then hydrate from /api/modules/:slug when it's reachable. The icon always
  // comes from local data (the API returns plain JSON, not a component).
  const [module, setModule] = useState(local || null);
  const [lessons, setLessons] = useState(placeholderLessons);

  useEffect(() => {
    let active = true;

    // Reset to local data whenever the slug changes.
    setModule(getModule(slug) || null);
    setLessons(placeholderLessons);

    fetch(`/api/modules/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (!active || !data?.module) return;
        // Override text fields with API data; keep the local icon.
        setModule((prev) => ({ ...(prev || {}), ...data.module }));
        if (Array.isArray(data.module.lessons) && data.module.lessons.length) {
          setLessons(data.module.lessons);
        }
      })
      .catch(() => {
        // API unavailable or 404 — fall back to local data already in state.
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (!module) {
    return (
      <main>
        <nav className="nav">
          <Link className="brand" to="/">
            <div className="logo"><Code2 size={22} /></div>
            <span>AI App Builder Academy</span>
          </Link>
        </nav>
        <section className="section">
          <div className="sectionHeader">
            <p>Not found</p>
            <h2>That module doesn&apos;t exist yet.</h2>
          </div>
          <Link className="backLink" to="/">
            <ArrowLeft size={18} /> Back to all modules
          </Link>
        </section>
      </main>
    );
  }

  const Icon = module.icon || Code2;

  return (
    <main>
      <nav className="nav">
        <Link className="brand" to="/">
          <div className="logo"><Code2 size={22} /></div>
          <span>AI App Builder Academy</span>
        </Link>
        <div className="navLinks">
          <Link to="/">Home</Link>
        </div>
      </nav>

      <section className="section moduleDetail">
        <Link className="backLink" to="/#modules">
          <ArrowLeft size={18} /> Back to curriculum
        </Link>

        <div className="moduleDetailHead">
          <div className="moduleDetailIcon">
            <Icon size={30} />
          </div>
          <div>
            <span className="eyebrow">{module.level} · {module.time}</span>
            <h1>{module.title}</h1>
            <p className="muted">{module.description}</p>
          </div>
        </div>

        <div className="sectionHeader lessonsHeader">
          <p>Lessons</p>
          <h2>What you&apos;ll work through.</h2>
        </div>

        <div className="lessonList">
          {lessons.map((lesson, index) => (
            <div className="lessonCard" key={lesson.id || lesson.slug || lesson.title}>
              <div className="lessonNumber">{index + 1}</div>
              <div className="lessonBody">
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </div>
              <div className="lessonMeta">
                <PlayCircle size={18} />
                <span>{lesson.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ModuleDetail;
