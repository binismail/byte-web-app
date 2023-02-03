import React from 'react';
import ByteIcon from '../icon/byte.icon';

export interface IShadowIcon {
  color: string;
  size: string;
  className: string;
  icon: string;
}

const IconShadow: React.FC<IShadowIcon> = ({
  color,
  size,
  icon,
  className,
}) => {
  return (
    <div className={`icon-shadow ${className} flex flex-center`}>
      <ByteIcon
        style={{ marginTop: '0px' }}
        icon={icon}
        size={size}
        color={color}
      />{' '}
    </div>
  );
};

export default IconShadow;
