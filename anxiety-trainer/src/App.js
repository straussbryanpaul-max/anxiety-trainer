import React, { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import {
  loadEntry,
  saveEntry,
  getEntryDates,
  getDefaultEntry,
  toDateKey,
  formatDisplayDate,
} from './storage';
import DateSelector from './components/DateSelector';
import PillarsSection from './components/PillarsSection';
import DailyRepsSection from './components/DailyRepsSection';
import FourthResponseSection from './components/FourthResponseSection';
import TrainingNotesSection from './components/TrainingNotesSection';

export default function App() {
  const today = toDateKey(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [entry, setEntry] = useState(getDefaultEntry());
  const [entryDates, setEntryDates] = useState([]);
  const [saveStatus, setSaveStatus] = useState('');

  // Load entry dates list
  const refreshDates = useCallback(() => {
    setEntryDates(getEntryDates());
  }, []);

  // Load entry for selected date
  useEffect(() => {
    const saved = loadEntry(selectedDate);
    setEntry(saved || getDefaultEntry());
  }, [selectedDate]);

  useEffect(() => {
    refreshDates();
  }, [refreshDates]);

  // Auto-save with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      saveEntry(selectedDate, entry);
      refreshDates();
      setSaveStatus('saved');
      const clear = setTimeout(() => setSaveStatus(''), 1500);
      return () => clearTimeout(clear);
    }, 600);
    return () => clearTimeout(timer);
  }, [entry, selectedDate, refreshDates]);

  const updatePillar = (key, value) =>
    setEntry(e => ({ ...e, pillars: { ...e.pillars, [key]: value } }));

  const toggleRep = (key) =>
    setEntry(e => ({ ...e, dailyReps: { ...e.dailyReps, [key]: !e.dailyReps[key] } }));

  const updateFourth = (key, value) =>
    setEntry(e => ({ ...e, fourthResponse: { ...e.fourthResponse, [key]: value } }));

  const updateNote = (key, value) =>
    setEntry(e => ({ ...e, trainingNotes: { ...e.trainingNotes, [key]: value } }));

  const isToday = selectedDate === today;

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>AT</div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>ANXIETY<br />TRAINER</span>
              <span className={styles.logoSub}>TRAIN YOUR RESPONSE</span>
            </div>
          </div>
          <div className={styles.headerRight}>
            {saveStatus === 'saved' && (
              <span className={styles.savedBadge}>✓ Saved</span>
            )}
            <DateSelector
              selectedDate={selectedDate}
              today={today}
              entryDates={entryDates}
              onSelect={setSelectedDate}
            />
          </div>
        </header>

        {/* Title Bar */}
        <div className={styles.titleBar}>
          <div className={styles.titleLine} />
          <h1 className={styles.mainTitle}>
            DAILY<span className={styles.titleGold}>RESISTANCE</span> CHECK
          </h1>
          <div className={styles.titleLine} />
        </div>

        {/* Date display */}
        <div className={styles.dateDisplay}>
          {isToday ? "TODAY — " : ""}{formatDisplayDate(selectedDate)}
        </div>

        {/* Top grid: Pillars + Daily Reps */}
        <div className={styles.topGrid}>
          <PillarsSection pillars={entry.pillars} onChange={updatePillar} />
          <DailyRepsSection reps={entry.dailyReps} onToggle={toggleRep} />
        </div>

        {/* 4th Response Check */}
        <FourthResponseSection data={entry.fourthResponse} onChange={updateFourth} />

        {/* Training Notes */}
        <TrainingNotesSection data={entry.trainingNotes} onChange={updateNote} />

        {/* Footer */}
        <footer className={styles.footer}>
          <p>
            TRAINING IS NOT ABOUT HOW YOU FEEL.
            <br />
            IT'S ABOUT <span className={styles.footerGold}>HOW YOU RESPOND.</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
