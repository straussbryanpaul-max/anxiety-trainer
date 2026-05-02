import React from 'react';
import styles from './TrainingNotesSection.module.css';

const fields = [
  { key: 'whereResist', label: 'WHERE DID I RESIST TODAY' },
  { key: 'howRespond', label: 'HOW DID I RESPOND TODAY' },
  { key: 'whatLearn', label: 'WHAT DID I LEARN TODAY' },
  { key: 'repTomorrow', label: 'WHAT IS MY REP TOMORROW' },
  { key: 'win', label: 'WIN:', gold: true },
];

export default function TrainingNotesSection({ data, onChange }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>TRAINING NOTES</div>
      <div className={styles.items}>
        {fields.map(f => (
          <div key={f.key} className={styles.item}>
            <label className={`${styles.label} ${f.gold ? styles.gold : ''}`}>
              {f.label}
            </label>
            <AutoTextarea
              value={data[f.key]}
              onChange={v => onChange(f.key, v)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function AutoTextarea({ value, onChange }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <textarea
      ref={ref}
      className={styles.textarea}
      rows={1}
      value={value}
      placeholder="Write here..."
      onChange={e => onChange(e.target.value)}
    />
  );
}
