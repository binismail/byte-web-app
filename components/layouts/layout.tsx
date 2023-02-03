import React from 'react';

interface ILayout {
  children: any;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};
export default Layout;
