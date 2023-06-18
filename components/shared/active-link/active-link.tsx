import { Icon } from 'iconsax-react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  text: string;
  Icon: Icon;
}

const ActiveLink = ({ ...props }: ActiveLinkProps) => {
  const { asPath } = useRouter();

  const isActive = asPath === props.href || asPath === props.as;

  const className = isActive
    ? 'text-base text-[#6A78D1] font-normal'
    : 'text-[#808691] text-base font-normal';
  const isLinkActive: boolean = isActive;

  return (
    <Link {...props}>
      <li
        className={`inline-flex items-center gap-3 ${className} cursor-pointer`}
      >
        <props.Icon
          size="20"
          color={isLinkActive ? '#6A78D1' : '#808691'}
          variant={isLinkActive ? 'Bold' : 'Linear'}
        />
        {props.text}
      </li>
    </Link>
  );
};

export default ActiveLink;
