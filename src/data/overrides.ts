import { useSyncExternalStore } from 'react';

/**
 * Per-candidate overrides stored in the visitor's browser (localStorage).
 *
 * Rationale:
 *   - The candidate registry (`src/candidates/*.ts`) is the durable, shipped
 *     source of truth — visible to anyone hitting the GitHub Pages site.
 *   - This override layer lets the operator flip flags on/off in-browser
 *     (e.g. "mark interview completed") without redeploying.
 *   - Overrides take precedence over the config when present.
 */

const STORAGE_KEY = 'interview-toolkit:overrides:v1';
const CHANGE_EVENT = 'interview-toolkit:overrides-changed';

export interface CandidateOverride {
  completed?: boolean;
}

export type CandidateOverridesMap = Record<string, CandidateOverride>;

function readFromStorage(): CandidateOverridesMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeToStorage(next: CandidateOverridesMap): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  // Notify subscribers in the current tab (the 'storage' event only fires
  // in *other* tabs).
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function setCompletedOverride(id: string, completed: boolean): void {
  const cur = readFromStorage();
  cur[id] = { ...cur[id], completed };
  writeToStorage(cur);
}

/** Convenience: merge an override over a config value. */
export function resolveCompleted(
  id: string,
  configValue: boolean | undefined,
  overrides: CandidateOverridesMap,
): boolean {
  const o = overrides[id];
  if (o && typeof o.completed === 'boolean') return o.completed;
  return Boolean(configValue);
}

// ----- React integration via useSyncExternalStore -----

function subscribe(cb: () => void): () => void {
  const handler = (): void => cb();
  window.addEventListener('storage', handler);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(CHANGE_EVENT, handler);
  };
}

// Snapshot must be referentially stable across reads when nothing changed,
// otherwise React will tear and warn.
let cachedSnapshot: CandidateOverridesMap = readFromStorage();
let cachedRawSerialized: string = JSON.stringify(cachedSnapshot);

function getSnapshot(): CandidateOverridesMap {
  const fresh = readFromStorage();
  const freshSerialized = JSON.stringify(fresh);
  if (freshSerialized !== cachedRawSerialized) {
    cachedSnapshot = fresh;
    cachedRawSerialized = freshSerialized;
  }
  return cachedSnapshot;
}

const SSR_SNAPSHOT: CandidateOverridesMap = {};
function getServerSnapshot(): CandidateOverridesMap {
  return SSR_SNAPSHOT;
}

export function useCandidateOverrides(): CandidateOverridesMap {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
