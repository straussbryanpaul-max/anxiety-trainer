const STORAGE_KEY = 'anxiety_trainer_entries';

export const getDefaultEntry = () => ({
  pillars: {
    fear: '',
    fight: '',
    fixate: '',
    feelings: '',
  },
  dailyReps: {
    trigger: false,
    resistance: false,
    response: false,
    reEngagement: false,
    carryOn: false,
  },
  fourthResponse: {
    notice: '',
    carryOnWith: '',
    reEngage: '',
    carryOnWithout: '',
  },
  trainingNotes: {
    whereResist: '',
    howRespond: '',
    whatLearn: '',
    repTomorrow: '',
    win: '',
  },
});

export const loadAllEntries = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const saveEntry = (dateKey, entry) => {
  try {
    const all = loadAllEntries();
    all[dateKey] = entry;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return true;
  } catch {
    return false;
  }
};

export const loadEntry = (dateKey) => {
  const all = loadAllEntries();
  return all[dateKey] || null;
};

export const getEntryDates = () => {
  const all = loadAllEntries();
  return Object.keys(all).sort((a, b) => b.localeCompare(a));
};

export const toDateKey = (date) => {
  // Returns YYYY-MM-DD in local time
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const formatDisplayDate = (dateKey) => {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
};
