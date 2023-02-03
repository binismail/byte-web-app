import styles from './tabs.module.scss';
export interface ITabs {
  label: string[];
  click: any;
  value: string;
}

const Tabs: React.FC<ITabs> = ({
  label = ['Sales', 'Expense'],
  click,
  value,
}) => {
  return (
    <div className={styles.tabsContainer}>
      <div className="flex flex-space-between">
        {label.map((t) => (
          <div
            onClick={() => click(t)}
            style={{ paddingBottom: 'var(--space-md-2)' }}
            className={`${t === value ? styles.tabActive : styles.tab}`}
            key={t}
          >
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
