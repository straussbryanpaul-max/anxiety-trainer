import React from 'react';
import styles from './DailyRepsSection.module.css';

const reps = [
  { key: 'trigger', label: 'Trigger' },
  { key: 'resistance', label: 'Resistance' },
  { key: 'response', label: 'Response' },
  { key: 'reEngagement', label: 'Re-Engagement' },
  { key: 'carryOn', label: 'Carry On' },
];

export default function DailyRepsSection({ reps: data, onToggle }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>DAILY REPS</div>
      <div className={styles.items}>
        {reps.map(r => (
          <div
            key={r.key}
            className={`${styles.item} ${data[r.key] ? styles.checked : ''}`}
            onClick={() => onToggle(r.key)}
            role="checkbox"
            aria-checked={data[r.key]}
            tabIndex={0}
            onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && onToggle(r.key)}
          >
            <div className={styles.checkbox}>
              {data[r.key] && <span className={styles.checkmark}>✓</span>}
            </div>
            <span className={styles.label}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
