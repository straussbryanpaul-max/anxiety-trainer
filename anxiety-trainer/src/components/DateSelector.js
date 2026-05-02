import React, { useState, useRef, useEffect } from 'react';
import styles from './DateSelector.module.css';
import { formatDisplayDate } from '../storage';

export default function DateSelector({ selectedDate, today, entryDates, onSelect }) {
  const [open, setOpen] = useState(false);
  const [customDate, setCustomDate] = useState('');
  const ref = useRef(null);

  // Merge entry dates with today so today always appears
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

  const handleCustomDate = (e) => {
    const val = e.target.value;
    setCustomDate(val);
    if (val) {
      onSelect(val);
      setOpen(false);
    }
  };

  const label = selectedDate === today ? 'TODAY' : selectedDate;

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.trigger} onClick={() => setOpen(o => !o)}>
        <span className={styles.triggerLabel}>{label}</span>
        <span className={styles.caret}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>SELECT DATE</div>

          <input
            type="date"
            className={styles.datePicker}
            value={customDate || selectedDate}
            max={today}
            onChange={handleCustomDate}
          />

          <div className={styles.divider} />

          <div className={styles.list}>
            {allDates.length === 0 ? (
              <div className={styles.noEntries}>No previous entries</div>
            ) : (
              allDates.map(d => (
                <button
                  key={d}
                  className={`${styles.dateItem} ${d === selectedDate ? styles.active : ''}`}
                  onClick={() => handleSelect(d)}
                >
                  <span className={styles.dateLabel}>
                    {d === today ? '★ TODAY' : formatDisplayDate(d).split(',')[0] + ', ' + d}
                  </span>
                  {d === today && <span className={styles.todayBadge}>NEW</span>}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
