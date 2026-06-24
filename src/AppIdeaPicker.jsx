import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { appIdeaCategories } from './data';

// "What kind of app do you want to build?" picker shown before the lessons in
// the first module. Selecting a category tailors the setup guidance slightly
// (tailored examples + a build tip, surfaced here and as a banner on later
// modules). The choice is a client-side preference only — it is stored in
// localStorage and is NOT written to the database.
function AppIdeaPicker({ selected, onSelect }) {
  const active = appIdeaCategories.find((c) => c.id === selected);

  return (
    <section className="ideaPicker">
      <div className="sectionHeader">
        <p>Start here</p>
        <h2>What kind of app do you want to build?</h2>
        <p className="muted ideaPickerIntro">
          Pick the closest match. The rest of this course tailors its setup
          guidance to the type of app you choose. You can change this anytime.
        </p>
      </div>

      <div className="ideaGrid">
        {appIdeaCategories.map((category) => {
          const isActive = category.id === selected;
          return (
            <button
              key={category.id}
              type="button"
              className={`ideaCard${isActive ? ' active' : ''}`}
              aria-pressed={isActive}
              onClick={() => onSelect(category.id)}
            >
              <div className="ideaCardTop">
                <span>{category.name}</span>
                {isActive && <Check size={18} />}
              </div>
              <p>{category.blurb}</p>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="ideaTailored">
          <div className="ideaTailoredHead">
            <Sparkles size={18} />
            <span>Building a {active.name}</span>
          </div>
          <p className="ideaExamples">
            Examples: {active.examples.join(' · ')}
          </p>
          <p className="muted">{active.tip}</p>
        </div>
      )}
    </section>
  );
}

export default AppIdeaPicker;
