import React from 'react';
import ByteIcon from '../shared/icon/byte.icon';
import styles from './menu-item.module.scss';

export interface IInput {
  icon: string;
  title: string;
  description: string;
  href?: any;
}

const MenuItem: React.FC<IInput> = ({ icon, title, description, href }) => {
  return (
    <div className={styles.container}>
      <a href={href}>
        <div className="text-center">
          <ByteIcon icon={icon} size="16" />
          <p className="text-label text-strong text-neutral-07">{title}</p>
          <p className="text-label">{description}</p>
        </div>
      </a>
    </div>
  );
};

export default MenuItem;
