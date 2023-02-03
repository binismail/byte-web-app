import IconShadow from '../../icon/icon-shadow';
import styles from './Invoice-table.module.scss';
export interface IInvoiceTable {
  header: any;
  contents: any;
}

const InvoiceTable: React.FC<IInvoiceTable> = ({ header, contents }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        {header && (
          <tr className={`${styles.tr} + ${styles.header}`}>
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
              <p className={styles.subDescription}> {content.expiryDate}</p>
            </td>

            <td className={styles.td}>
              <p className={styles.subDescription}> {content.deliveryDate}</p>
            </td>
            <td className={styles.td}>
              <p
                className={`${styles.status} + ${
                  content.status === 'Paid'
                    ? styles.paid
                    : content.status === 'Unpaid'
                    ? styles.unpaid
                    : styles.overdue
                }`}
              >
                {' '}
                {content.status}
              </p>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default InvoiceTable;
