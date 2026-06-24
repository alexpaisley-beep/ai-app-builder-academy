import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  PlayCircle,
  Code2,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { getModule, firstModuleSlug, appIdeaCategories } from './data';
import AppIdeaPicker from './AppIdeaPicker';

const APP_TYPE_KEY = 'aiacademy.appType';

function readAppType() {
  try {
    return window.localStorage.getItem(APP_TYPE_KEY) || '';
  } catch {
    return '';
  }
}

function ModuleDetail() {
  const { slug } = useParams();
  const local = getModule(slug);

  // Render local data immediately so the page works even if the API is down,
  // then hydrate from /api/modules/:slug when it's reachable. The icon always
  // comes from local data (the API returns plain JSON, not a component).
  const [module, setModule] = useState(local || null);
  const [lessons, setLessons] = useState(local?.lessons || []);

  // Selected app idea (client-side preference, persisted in localStorage).
  const [appType, setAppType] = useState(readAppType);

  const selectAppType = (id) => {
    const next = id === appType ? '' : id;
    setAppType(next);
    try {
      if (next) window.localStorage.setItem(APP_TYPE_KEY, next);
      else window.localStorage.removeItem(APP_TYPE_KEY);
    } catch {
      // Preference is best-effort; ignore storage failures.
    }
  };

  useEffect(() => {
    let active = true;

    // Reset to local data whenever the slug changes.
    const localModule = getModule(slug);
    setModule(localModule || null);
    setLessons(localModule?.lessons || []);

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
          <Link className="backLink" to="/#modules">
            <ArrowLeft size={18} /> Back to curriculum
          </Link>
        </section>
      </main>
    );
  }

  const Icon = module.icon || Code2;
  const isFirstModule = module.slug === firstModuleSlug;
  const activeCategory = appIdeaCategories.find((c) => c.id === appType);

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

        {/* The app-idea picker appears before the lessons of the first module. */}
        {isFirstModule && (
          <AppIdeaPicker selected={appType} onSelect={selectAppType} />
        )}

        {/* On later modules, surface the chosen app type as a light banner. */}
        {!isFirstModule && activeCategory && (
          <div className="appTypeBanner">
            <Sparkles size={18} />
            <div>
              <strong>Building a {activeCategory.name}.</strong>{' '}
              <span className="muted">{activeCategory.tip}</span>
            </div>
            <Link to={`/modules/${firstModuleSlug}`} className="appTypeChange">
              Change
            </Link>
          </div>
        )}

        <div className="sectionHeader lessonsHeader">
          <p>Lessons</p>
          <h2>What you&apos;ll work through.</h2>
        </div>

        <div className="lessonList">
          {lessons.map((lesson, index) => (
            <article
              className="lessonCard"
              key={lesson.id || lesson.slug || lesson.title}
            >
              <header className="lessonHead">
                <div className="lessonNumber">{index + 1}</div>
                <div className="lessonHeadText">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                </div>
                {lesson.time && (
                  <div className="lessonMeta">
                    <PlayCircle size={18} />
                    <span>{lesson.time}</span>
                  </div>
                )}
              </header>

              {lesson.content && (
                <div className="lessonContent">
                  {lesson.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {lesson.aiPrompts?.length > 0 && (
                <div className="lessonBlock aiBlock">
                  <div className="lessonBlockHead">
                    <MessageSquare size={16} /> Ask AI this
                  </div>
                  <ul className="promptList">
                    {lesson.aiPrompts.map((prompt, i) => (
                      <li key={i}>{prompt}</li>
                    ))}
                  </ul>
                </div>
              )}

              {lesson.checklist?.length > 0 && (
                <div className="lessonBlock checkBlock">
                  <div className="lessonBlockHead">
                    <CheckCircle2 size={16} /> You&apos;re done when
                  </div>
                  <ul className="lessonChecklist">
                    {lesson.checklist.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={15} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {lesson.warnings?.length > 0 && (
                <div className="lessonBlock warnBlock">
                  <div className="lessonBlockHead">
                    <AlertTriangle size={16} /> Watch out
                  </div>
                  <ul className="warnList">
                    {lesson.warnings.map((warning, i) => (
                      <li key={i}>
                        <AlertTriangle size={15} />
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ModuleDetail;
