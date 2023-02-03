import styles from './record-table.module.scss';
export interface IRecordTable {
  header: any;
  contents: any;
}

const RecordTable: React.FC<IRecordTable> = ({ header, contents }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        {header && (
          <tr className={styles.tr}>
            {header.map((res: any, i: number) => (
              <th key={i} className={styles.th}>
                {res}
              </th>
            ))}
          </tr>
        )}
        {contents.map((content: any, i: number) => (
          <tr key={i} className={styles.tr}>
            <td className={`${styles.td}`}>
              <div className="flex flex-align-center">
                <div className="mr-sm-2">
                  {content.type === 'negative' ? (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#FFE6EB" />
                      <path
                        d="M27.0827 28.9585H12.916C12.5743 28.9585 12.291 28.6752 12.291 28.3335C12.291 27.9918 12.5743 27.7085 12.916 27.7085H27.0827C27.4243 27.7085 27.7077 27.9918 27.7077 28.3335C27.7077 28.6752 27.4243 28.9585 27.0827 28.9585Z"
                        fill="#CF4F66"
                      />
                      <path
                        d="M14.1655 25.2085C14.3238 25.2085 14.4822 25.1502 14.6072 25.0252L26.2738 13.3585C26.5155 13.1169 26.5155 12.7169 26.2738 12.4752C26.0322 12.2335 25.6322 12.2335 25.3905 12.4752L13.7238 24.1419C13.4822 24.3835 13.4822 24.7835 13.7238 25.0252C13.8488 25.1502 14.0072 25.2085 14.1655 25.2085Z"
                        fill="#CF4F66"
                      />
                      <path
                        d="M25.832 22.0998C26.1737 22.0998 26.457 21.8165 26.457 21.4748V12.9165C26.457 12.5748 26.1737 12.2915 25.832 12.2915H17.2737C16.932 12.2915 16.6487 12.5748 16.6487 12.9165C16.6487 13.2582 16.932 13.5415 17.2737 13.5415H25.207V21.4748C25.207 21.8165 25.4904 22.0998 25.832 22.0998Z"
                        fill="#CF4F66"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#DBFFF2" />
                      <path
                        d="M13.9243 25.1585C14.0077 25.1919 14.0827 25.2085 14.166 25.2085H22.7243C23.066 25.2085 23.3493 24.9252 23.3493 24.5835C23.3493 24.2419 23.066 23.9585 22.7243 23.9585H15.6743L26.2744 13.3585C26.516 13.1169 26.516 12.7169 26.2744 12.4752C26.0327 12.2335 25.6327 12.2335 25.391 12.4752L14.791 23.0752V16.0252C14.791 15.6835 14.5077 15.4002 14.166 15.4002C13.8243 15.4002 13.541 15.6835 13.541 16.0252V24.5835C13.541 24.6669 13.5577 24.7419 13.591 24.8252C13.6493 24.9752 13.7743 25.1002 13.9243 25.1585Z"
                        fill="#19A97B"
                      />
                      <path
                        d="M27.0827 27.7085H12.916C12.5743 27.7085 12.291 27.9918 12.291 28.3335C12.291 28.6752 12.5743 28.9585 12.916 28.9585H27.0827C27.4243 28.9585 27.7077 28.6752 27.7077 28.3335C27.7077 27.9918 27.4243 27.7085 27.0827 27.7085Z"
                        fill="#19A97B"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className={styles.description}> {content.name}</p>
                </div>
              </div>
            </td>
            <td className={styles.td}>
              <p className={styles.subDescription}> {content.items}</p>
            </td>
            <td className={styles.td}>
              <p className={styles.description}> {content.amount}</p>
            </td>

            <td className={styles.td}>
              <p className={styles.subDescription}> {content.date}</p>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default RecordTable;
