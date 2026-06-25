import React, { useEffect, useMemo, useState } from 'react';
import {
  Lightbulb,
  Database,
  Plug,
  AlertTriangle,
  Sparkles,
  Copy,
  Check,
  ListChecks,
  Wrench
} from 'lucide-react';
import { appTypes, lessonPrompts, lessonChecklist } from './data';
import { loadSelection, saveSelection, selectionLabel } from './appSelection';

// Interactive Lesson 1 — "What kind of app do you want to build?"
//
// Fully client-side: the learner picks an app type (or a custom idea), gets
// tailored guidance, copyable AI prompts seeded with their choice, and a
// completion checklist. The chosen app type is persisted to localStorage so
// later lessons can show a "You are building: ___" banner.

function Lesson1() {
  const stored = useMemo(() => loadSelection(), []);
  const [selectedId, setSelectedId] = useState(stored ? stored.typeId : null);
  const [customIdea, setCustomIdea] = useState(stored ? stored.customIdea || '' : '');
  const [copiedId, setCopiedId] = useState(null);
  const [checked, setChecked] = useState({});

  const selectedType = appTypes.find((type) => type.id === selectedId) || null;

  // Persist the selection whenever it changes (type or custom idea text).
  useEffect(() => {
    if (!selectedType) return;
    saveSelection({
      typeId: selectedType.id,
      label: selectedType.label,
      customIdea: selectedType.id === 'custom' ? customIdea : ''
    });
  }, [selectedType, customIdea]);

  // The label used inside AI prompts and the live banner.
  const appLabel = selectionLabel(
    selectedType
      ? { typeId: selectedType.id, label: selectedType.label, customIdea }
      : null
  );

  const handleCopy = async (prompt) => {
    const text = prompt.template.replace('{app}', appLabel || 'my app');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard blocked — fall back to a hidden textarea copy.
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* nothing more we can do */
      }
      document.body.removeChild(ta);
    }
    setCopiedId(prompt.id);
    window.setTimeout(() => setCopiedId((id) => (id === prompt.id ? null : id)), 1600);
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="lesson1">
      <div className="lessonIntro">
        <span className="eyebrow">Lesson 1 · Interactive</span>
        <h2>What kind of app do you want to build?</h2>
        <p className="muted">
          Pick the category that fits your idea best. You will get tailored guidance and
          AI prompts built around your choice. You can change this anytime — it is saved
          on this device only.
        </p>
      </div>

      {appLabel && (
        <div className="buildingBanner" role="status">
          <Sparkles size={18} />
          <span>
            You are building: <strong>{appLabel}</strong>
          </span>
        </div>
      )}

      <div className="appTypeGrid">
        {appTypes.map((type) => (
          <button
            type="button"
            key={type.id}
            className={`appTypeCard${selectedId === type.id ? ' selected' : ''}`}
            onClick={() => setSelectedId(type.id)}
            aria-pressed={selectedId === type.id}
          >
            {type.label}
          </button>
        ))}
      </div>

      {selectedType && selectedType.id === 'custom' && (
        <div className="customIdea">
          <label htmlFor="customIdeaInput">Describe your app in one sentence</label>
          <input
            id="customIdeaInput"
            type="text"
            placeholder="e.g. an app that helps dog walkers schedule and bill recurring clients"
            value={customIdea}
            onChange={(event) => setCustomIdea(event.target.value)}
          />
        </div>
      )}

      {selectedType && (
        <div className="appDetails">
          <div className="detailCard">
            <div className="detailHead">
              <Lightbulb size={18} />
              <h3>Simple examples</h3>
            </div>
            <p>{selectedType.examples}</p>
          </div>
          <div className="detailCard">
            <div className="detailHead">
              <Wrench size={18} />
              <h3>What it usually needs</h3>
            </div>
            <p>{selectedType.needs}</p>
          </div>
          <div className="detailCard">
            <div className="detailHead">
              <Database size={18} />
              <h3>Likely database needs</h3>
            </div>
            <p>{selectedType.database}</p>
          </div>
          <div className="detailCard">
            <div className="detailHead">
              <Plug size={18} />
              <h3>Likely integrations</h3>
            </div>
            <p>{selectedType.integrations}</p>
          </div>
          <div className="detailCard">
            <div className="detailHead">
              <AlertTriangle size={18} />
              <h3>Avoid building too early</h3>
            </div>
            <p>{selectedType.avoid}</p>
          </div>
          <div className="detailCard highlight">
            <div className="detailHead">
              <Sparkles size={18} />
              <h3>Tailored setup tip</h3>
            </div>
            <p>{selectedType.tip}</p>
          </div>
        </div>
      )}

      <div className="lessonBlock">
        <div className="sectionHeader">
          <p>AI leverage</p>
          <h2>Copy a prompt and plan with AI.</h2>
        </div>
        {!selectedType && (
          <p className="muted promptHint">
            Pick an app type above and these prompts will be filled in with your choice.
          </p>
        )}
        <div className="promptGrid">
          {lessonPrompts.map((prompt) => {
            const text = prompt.template.replace('{app}', appLabel || 'my app');
            return (
              <div className="promptCard" key={prompt.id}>
                <div className="promptHead">
                  <h3>{prompt.title}</h3>
                  <button
                    type="button"
                    className="copyBtn"
                    onClick={() => handleCopy(prompt)}
                    aria-label={`Copy prompt: ${prompt.title}`}
                  >
                    {copiedId === prompt.id ? (
                      <>
                        <Check size={15} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={15} /> Copy
                      </>
                    )}
                  </button>
                </div>
                <p>{text}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lessonBlock">
        <div className="sectionHeader">
          <p>Before you move on</p>
          <h2>Lesson 1 checklist.</h2>
        </div>
        <div className="checklist">
          {lessonChecklist.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`checkItem checkToggle${checked[item.id] ? ' done' : ''}`}
              onClick={() =>
                setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
              }
              aria-pressed={!!checked[item.id]}
            >
              {checked[item.id] ? <Check size={20} /> : <ListChecks size={20} />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <p className="muted checklistProgress">
          {checkedCount} of {lessonChecklist.length} complete
          {checkedCount === lessonChecklist.length ? ' — nice. Onward.' : ''}
        </p>
      </div>
    </div>
  );
}

export default Lesson1;
