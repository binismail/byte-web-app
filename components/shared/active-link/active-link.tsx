import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
}

const ActiveLink = ({ children, ...props }: ActiveLinkProps) => {
  const { asPath } = useRouter();
  const child = React.Children.only(children);

  const isActive = asPath === props.href || asPath === props.as;

  const className = isActive
    ? 'text-base text-[#6A78D1] font-normal'
    : 'text-[#808691] text-base font-normal';
  const isLinkActive: boolean = isActive;

  return (
    <Link {...props}>
      {cloneElement(child, {
        className,
        isLinkActive,
      })}
    </Link>
  );
};

export default ActiveLink;
