import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../lib/redux/store';
import '../styles/badge.scss';
import '../styles/colors.scss';
import '../styles/dashboard.scss';
import '../styles/form.scss';
import '../styles/globals.scss';
import '../styles/icon.scss';
import '../styles/text.scss';
import '../styles/variable.scss';

// Import Tailwind CSS file config
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import RouteGuard from '../components/route-guard/route-guard';
import '../styles/tailwind.css';

// type NextPageWithLayout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// AppProps type
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// persistor
let persistor = persistStore(store);

// My App component
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteGuard>
          <>{getLayout(<Component {...pageProps} />)}</>
        </RouteGuard>
      </PersistGate>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        limit={1}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        transition={Zoom}
        pauseOnHover
        draggablePercent={40}
        theme="light"
      />
    </Provider>
  );
}

export default MyApp;
