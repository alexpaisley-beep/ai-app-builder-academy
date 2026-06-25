// Client-side persistence for the learner's chosen app type.
//
// This is the ONLY thing we store, and it lives entirely in localStorage — no
// auth, no accounts, no database writes. Later lessons/modules read it to show a
// small "You are building: ___" banner.

const STORAGE_KEY = 'aiab:selectedApp';

// Shape stored in localStorage:
//   { typeId: string, label: string, customIdea?: string }

export function loadSelection() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.typeId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSelection(selection) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  } catch {
    // Storage unavailable (private mode, quota) — selection just won't persist.
  }
}

export function clearSelection() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}

// Human-readable label for the current selection: the custom idea text when the
// learner chose "custom idea" and typed something, otherwise the type label.
export function selectionLabel(selection) {
  if (!selection) return null;
  if (selection.typeId === 'custom') {
    const idea = (selection.customIdea || '').trim();
    return idea || 'a custom idea';
  }
  return selection.label;
}
