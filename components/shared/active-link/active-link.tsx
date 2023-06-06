import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

const ActiveLink = ({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps) => {
  const { asPath } = useRouter();
  const child = React.Children.only(children);

  const isActive = asPath === props.href || asPath === props.as;

  const className = isActive ? activeClassName : '';

  return (
    <Link {...props}>
      {cloneElement(child, {
        className,
      })}
    </Link>
  );
};

export default ActiveLink;
