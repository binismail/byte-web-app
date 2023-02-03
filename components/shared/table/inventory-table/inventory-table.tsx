import IconShadow from '../../icon/icon-shadow';
import styles from './inventory-table.module.scss';
export interface IInventoryTable {
  header: any;
  contents: any;
}

const InventoryTable: React.FC<IInventoryTable> = ({ header, contents }) => {
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
            <td className={styles.td}>
              <p className={styles.subDescription}> {content.item}</p>
            </td>

            <td className={`${styles.td}`}>
              <div className="flex flex-align-center">
                <div className="mr-sm-2">
                  <IconShadow
                    icon="d-cube-scan"
                    color="var(--neutral06)"
                    size="16"
                    className="grey small"
                  />
                </div>
                <div>
                  <p className={styles.description}> {content.name}</p>
                </div>
              </div>
            </td>

            <td className={styles.td}>
              <p className={styles.description}> {content.amount}</p>
            </td>

            <td className={styles.td}>
              <p className={styles.subDescription}> {content.availability}</p>
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

export default InventoryTable;
