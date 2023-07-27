import { Icon } from 'iconsax-react';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './menu-item.module.scss';

export interface IInput {
  Icon: Icon;
  title: string;
  description: string;
  path: string;
}

const MenuItem: React.FC<IInput> = ({ Icon, title, description, path }) => {
  // DATA INITIALIZATION
  const router = useRouter();

  return (
    <div onClick={() => router.push(path)} className={styles.container}>
      <Icon size="20" className="mx-auto" color="#565A63" variant="Outline" />
      <div className="w-full flex-col flex items-center gap-1 text-center px-2">
        <p className="text-sm font-normal text-[#565A63]">{title}</p>
        <p className="text-[#808691] text-sm font-normal">{description}</p>
      </div>
    </div>
  );
};

export default MenuItem;
