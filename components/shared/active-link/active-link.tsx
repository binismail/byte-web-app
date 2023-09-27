import { Icon } from 'iconsax-react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  text: string;
  Icon: Icon;
  exact?: boolean;
}

const ActiveLink = ({ ...props }: ActiveLinkProps) => {
  const { asPath } = useRouter();

  const isLinkActive = props.exact
    ? asPath === props.href
    : asPath.includes(props.href as string);

  const className = isLinkActive
    ? 'text-base text-[#6A78D1] font-normal'
    : 'text-[#808691] text-base font-normal';

  return (
    <Link {...props}>
      <li
        className={`inline-flex items-center gap-6 ${className} cursor-pointer`}
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
