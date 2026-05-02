import React, { useState, useRef, useEffect } from 'react';
import styles from './DateSelector.module.css';
import { formatDisplayDate } from '../storage';

export default function DateSelector({ selectedDate, today, entryDates, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const allDates = Array.from(new Set([today, ...entryDates])).sort((a, b) => b.localeCompare(a));

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (date) => {
    onSelect(date);
    setOpen(false);
  };

  const handleDateInput = (e) => {
    const val = e.target.value;
    if (val) {
      onSelect(val);
      setOpen(false);
    }
  };

  const changeDay = (direction) => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + direction);
    const newKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (newKey <= today) onSelect(newKey);
  };

  const label = selectedDate === today ? 'TODAY' : selectedDate;

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.controls}>
        <button className={styles.arrow} onClick={() => changeDay(-1)} title="Previous day">‹</button>
        <button className={styles.trigger} onClick={() => setOpen(o => !o)}>
          <span className={styles.triggerLabel}>{label}</span>
          <span className={styles.caret}>{open ? '▲' : '▼'}</span>
        </button>
        <button
          className={styles.arrow}
          onClick={() => changeDay(1)}
          disabled={selectedDate >= today}
          title="Next day"
        >›</button>
      </div>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>SELECT DATE</div>

          <div className={styles.datePickerWrap}>
            <label className={styles.datePickerLabel}>Pick any date:</label>
            <input
              type="date"
              className={styles.datePicker}
              defaultValue={selectedDate}
              max={today}
              onChange={handleDateInput}
            />
          </div>

          <div className={styles.divider} />

          <div className={styles.list}>
            {allDates.map(d => (
              <button
                key={d}
                className={`${styles.dateItem} ${d === selectedDate ? styles.active : ''}`}
                onClick={() => handleSelect(d)}
              >
                <span className={styles.dateLabel}>
                  {d === today ? '★ TODAY' : formatDisplayDate(d)}
                </span>
                {d === today && <span className={styles.todayBadge}>NEW</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
