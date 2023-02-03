import styles from './table.module.scss';
export interface ITable {
  header: any[];
  content: any[];
}

const Table: React.FC<ITable> = ({ header }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        {header && (
          <tr className={styles.tr}>
            {header.map((res, i) => (
              <th key={i} className={styles.th}>
                {res}
              </th>
            ))}
          </tr>
        )}
        <tr className={styles.tr}>
          <td className={`${styles.td}`}>
            <div className="flex flex-align-center">
              <div className={styles.tranIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.92435 15.1583C4.00768 15.1916 4.08268 15.2083 4.16602 15.2083H12.7243C13.066 15.2083 13.3493 14.925 13.3493 14.5833C13.3493 14.2416 13.066 13.9583 12.7243 13.9583H5.67435L16.2744 3.35828C16.516 3.11662 16.516 2.71662 16.2744 2.47495C16.0327 2.23328 15.6327 2.23328 15.391 2.47495L4.79102 13.075V6.02495C4.79102 5.68328 4.50768 5.39995 4.16602 5.39995C3.82435 5.39995 3.54102 5.68328 3.54102 6.02495V14.5833C3.54102 14.6666 3.55768 14.7416 3.59102 14.825C3.64935 14.975 3.77435 15.1 3.92435 15.1583Z"
                    fill="#19A97B"
                  />
                  <path
                    d="M17.0827 17.7083H2.91602C2.57435 17.7083 2.29102 17.9916 2.29102 18.3333C2.29102 18.6749 2.57435 18.9583 2.91602 18.9583H17.0827C17.4243 18.9583 17.7077 18.6749 17.7077 18.3333C17.7077 17.9916 17.4243 17.7083 17.0827 17.7083Z"
                    fill="#19A97B"
                  />
                </svg>
              </div>
              <div>
                <p className={styles.description}> Alfreds Futterkiste</p>
                <p className={styles.subDescription}> 30 Oct 10:53 am</p>
              </div>
            </div>
          </td>
          <td className={styles.td}>
            <p className={styles.description}> ₦127,271.49</p>
            <p className={styles.subDescription}> Amount</p>
          </td>
          <td className={styles.td}>
            <p className={styles.description}> RFSFJBDD_352</p>
            <p className={styles.subDescription}> Transaction ID</p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Table;
