import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { wrapper } from '../lib/redux/store';
import '../styles/badge.scss';
import '../styles/colors.scss';
import '../styles/dashboard.scss';
import '../styles/form.scss';
import '../styles/globals.scss';
import '../styles/icon.scss';
import '../styles/text.scss';
import '../styles/variable.scss';

// Import Tailwind CSS file config
import '../styles/tailwind.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;
export default wrapper.withRedux(MyApp);
