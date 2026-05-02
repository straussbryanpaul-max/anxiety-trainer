import React from 'react';
import styles from './FourthResponseSection.module.css';

const steps = [
  { key: 'notice', bold: 'NOTICE', text: 'the shift' },
  { key: 'carryOnWith', bold: 'CARRY ON', text: 'with the symptoms' },
  { key: 'reEngage', bold: 'RE-ENGAGE', text: 'attention back to life' },
  { key: 'carryOnWithout', bold: 'CARRY ON', text: 'without monitoring' },
];

export default function FourthResponseSection({ data, onChange }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>THE 4TH RESPONSE CHECK</div>
      <div className={styles.items}>
        {steps.map(s => (
          <div key={s.key} className={styles.item}>
            <div className={styles.label}>
              <span className={styles.bold}>{s.bold}</span>
              <span className={styles.text}> {s.text}</span>
            </div>
            <input
              type="text"
              className={styles.input}
              placeholder="Notes..."
              value={data[s.key]}
              onChange={e => onChange(s.key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
