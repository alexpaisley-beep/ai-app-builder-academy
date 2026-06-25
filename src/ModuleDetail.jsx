import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, PlayCircle, Code2, Sparkles } from 'lucide-react';
import { getModule } from './data';
import { loadSelection, selectionLabel } from './appSelection';
import Lesson1 from './Lesson1';

function ModuleDetail() {
  const { slug } = useParams();
  const module = getModule(slug);

  // Read the saved app type once so later modules can show the banner too.
  const appLabel = useMemo(() => selectionLabel(loadSelection()), []);

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

  const Icon = module.icon;
  const lessons = module.lessons || [];
  const interactiveLesson = lessons.find((lesson) => lesson.interactive);
  const otherLessons = lessons.filter((lesson) => !lesson.interactive);

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
        <Link className="backLink" to="/">
          <ArrowLeft size={18} /> All modules
        </Link>

        {appLabel && (
          <div className="buildingBanner" role="status">
            <Sparkles size={18} />
            <span>
              You are building: <strong>{appLabel}</strong>
            </span>
          </div>
        )}

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

        {interactiveLesson && <Lesson1 />}

        <div className="sectionHeader lessonsHeader">
          <p>{interactiveLesson ? 'More in this module' : 'Lessons'}</p>
          <h2>What you&apos;ll work through.</h2>
        </div>

        <div className="lessonList">
          {(interactiveLesson ? otherLessons : lessons).map((lesson, index) => (
            <div className="lessonCard" key={lesson.slug || lesson.title}>
              <div className="lessonNumber">
                {(interactiveLesson ? index + 2 : index + 1)}
              </div>
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
