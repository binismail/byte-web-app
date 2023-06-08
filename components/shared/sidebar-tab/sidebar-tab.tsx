import { Icon } from 'iconsax-react';

type Props = {
  text: string;
  Icon: Icon;
  isLinkActive?: boolean;
  className?: string;
};

const SideBarTab = ({ text, Icon, isLinkActive, className }: Props) => {
  return (
    <li className={`inline-flex items-center gap-3 ${className}`}>
      <Icon
        size="20"
        color={isLinkActive ? '#6A78D1' : '#808691'}
        variant={isLinkActive ? 'Bold' : 'Linear'}
      />
      {text}
    </li>
  );
};

export default SideBarTab;
