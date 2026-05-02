import React from 'react';
import styles from './PillarsSection.module.css';

const pillars = [
  { key: 'fear', label: 'Did I', highlight: 'FEAR', suffix: 'symptoms or what they mean' },
  { key: 'fight', label: 'Did I', highlight: 'FIGHT', suffix: 'the experience' },
  { key: 'fixate', label: 'Did I', highlight: 'FIXATE', suffix: 'on symptoms' },
  {
    key: 'feelings',
    label: 'Did I get stuck in',
    highlight: 'FEELINGS',
    suffix: '',
    sub: 'like frustration anger sadness or discouragement',
  },
];

export default function PillarsSection({ pillars: data, onChange }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>4 PILLARS OF RESISTANCE</div>
      <div className={styles.items}>
        {pillars.map(p => (
          <div key={p.key} className={styles.item}>
            <div className={styles.question}>
              <span className={styles.questionText}>{p.label} </span>
              <span className={styles.highlight}>{p.highlight}</span>
              {p.suffix && <span className={styles.questionText}> {p.suffix}</span>}
              {p.sub && <div className={styles.subText}>{p.sub}</div>}
            </div>
            <input
              type="text"
              className={styles.input}
              placeholder="Notes..."
              value={data[p.key]}
              onChange={e => onChange(p.key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
