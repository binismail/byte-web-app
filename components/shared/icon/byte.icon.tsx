import React from 'react';
import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from '../../../public/icon/selection.json';

const ByteIcon = (props: IconProps) => <IcoMoon iconSet={iconSet} {...props} />;

export default ByteIcon;
