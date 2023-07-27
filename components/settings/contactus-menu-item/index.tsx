import { Icon } from 'iconsax-react';

export type ContactusMenuItemType = {
  Icon: Icon;
  title: string;
  description: string;
  href: string;
  targetBlank?: boolean;
  variant: 'Linear' | 'Outline' | 'Bold' | 'TwoTone' | 'Broken' | 'Bulk';
};

const ContactusMenuItem = ({
  Icon,
  title,
  description,
  href,
  targetBlank,
  variant = 'Bold',
}: ContactusMenuItemType) => {
  return (
    <a
      target={targetBlank ? '_blank' : undefined}
      href={href}
      className="rounded-[10px] px-4 py-6 flex flex-col items-center text-center gap-4 cursor-pointer bg-[#F8F9FA]"
      rel="noreferrer"
    >
      <Icon
        size="20"
        className="mx-auto h-1/3"
        color="#6A78D1"
        variant={variant}
      />
      <div className="w-full h-2/3 flex-col flex items-center gap-1 text-center px-2">
        <p className="text-sm font-normal text-[#565A63]">{title}</p>
        <p className="text-[#808691] text-sm font-normal">{description}</p>
      </div>
    </a>
  );
};

export default ContactusMenuItem;
