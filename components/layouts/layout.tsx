import { ReactElement } from 'react';

interface ILayout {
  children: ReactElement;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};
export default Layout;
