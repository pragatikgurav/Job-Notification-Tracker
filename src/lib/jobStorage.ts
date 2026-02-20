export interface Preferences {
  role: string;
  location: string;
  jobType: "remote" | "hybrid" | "onsite" | "";
  salaryMin: number;
  salaryMax: number;
  keywords: string;
}

export interface SavedJob {
  id: string;
  status: "saved" | "applied" | "interview" | "offer" | "rejected";
}

export interface DigestData {
  date: string;
  jobIds: string[];
}

const KEYS = {
  preferences: "jt-preferences",
  savedJobs: "jt-saved-jobs",
  digest: "jt-digest",
  checklist: "jt-checklist",
  currentStep: "jt-current-step",
};

export function getPreferences(): Preferences {
  const raw = localStorage.getItem(KEYS.preferences);
  return raw ? JSON.parse(raw) : { role: "", location: "", jobType: "", salaryMin: 0, salaryMax: 200000, keywords: "" };
}

export function savePreferences(prefs: Preferences) {
  localStorage.setItem(KEYS.preferences, JSON.stringify(prefs));
}

export function getSavedJobs(): SavedJob[] {
  const raw = localStorage.getItem(KEYS.savedJobs);
  return raw ? JSON.parse(raw) : [];
}

export function setSavedJobs(jobs: SavedJob[]) {
  localStorage.setItem(KEYS.savedJobs, JSON.stringify(jobs));
}

export function getDigest(): DigestData | null {
  const raw = localStorage.getItem(KEYS.digest);
  return raw ? JSON.parse(raw) : null;
}

export function saveDigest(digest: DigestData) {
  localStorage.setItem(KEYS.digest, JSON.stringify(digest));
}

export function getChecklist(): boolean[] {
  const raw = localStorage.getItem(KEYS.checklist);
  return raw ? JSON.parse(raw) : new Array(10).fill(false);
}

export function saveChecklist(items: boolean[]) {
  localStorage.setItem(KEYS.checklist, JSON.stringify(items));
}

export function getCurrentStep(): number {
  const raw = localStorage.getItem(KEYS.currentStep);
  return raw ? parseInt(raw, 10) : 1;
}

export function setCurrentStep(step: number) {
  localStorage.setItem(KEYS.currentStep, String(step));
}
