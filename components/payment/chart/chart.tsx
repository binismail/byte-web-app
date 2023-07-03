import React from 'react';
import ByteIcon from '../../shared/icon/byte.icon';
import styles from './chart.module.scss';

export interface IChart {
  title: string;
}

const Chart: React.FC<any> = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className="section-title">{title}</p>
        <div className="flex">
          <p className="mr-sm-1 text-small flex flex-align-center">
            Show for: This month
          </p>
          <div className="flex flex-align-center ">
            <ByteIcon icon="arrow-down-1" size={12} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.emptyState}>
          <p>No Data</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
