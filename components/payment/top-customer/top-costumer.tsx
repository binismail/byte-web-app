import React from 'react';
import ProductItem from '../../../../../components/product-item/product-item';
import ByteIcon from '../../../../../components/shared/icon/byte.icon';
import image from '../../../../../public/image/profile.jpg';
import styles from './top-customer.module.scss';

export interface ITopCustomer {
  title: string;
}

const TopCustomer: React.FC<any> = ({ title }) => {
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
        <ProductItem
          name="Sodik Kowowale"
          description="Spent ₦87,000 • Contributed 12%"
          amount="90,000"
          src={image}
        />
        <ProductItem
          name="Sodik Kowowale"
          description="Spent ₦87,000 • Contributed 12%"
          amount="90,000"
          src={image}
        />

        <ProductItem
          name="Sodik Kowowale"
          description="Spent ₦87,000 • Contributed 12%"
          amount="90,000"
          src={image}
        />
      </div>
    </div>
  );
};

export default TopCustomer;
