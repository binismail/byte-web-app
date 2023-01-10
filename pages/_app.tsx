import type { AppProps } from 'next/app';
import '../styles/colors.scss';
import '../styles/variable.scss';
import '../styles/globals.scss';
import '../styles/text.scss';
import '../styles/form.scss';
import '../styles/icon.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
