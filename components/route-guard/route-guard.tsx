import { useRouter } from 'next/router';
import {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  logout,
  selectLoggedIn,
  selectUserId,
} from '../../lib/redux/authSlice/authSlice';
import { useLogoutUserMutation } from '../../lib/services/businessApi';
const publicPaths = [
  '/auth/login',
  '/auth/register',
  '/onboarding/verify-phone/verifyphone',
  '/onboarding/forgotpassword/forgotpassword',
];

const RouteGuard = (props: {
  children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
}) => {
  // DATA INITIALIZATION
  const { children } = props;
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const [logoutUser] = useLogoutUserMutation();
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  // STATES
  const [authorized, setAuthorized] = useState(false);

  // SIDE EFFECTS
  useEffect(() => {
    const authCheck = () => {
      if (!isLoggedIn && !publicPaths.includes(router.asPath.split('?')[0])) {
        setAuthorized(false);
        router.push({
          pathname: '/auth/login',
          query: { returnUrl: router.asPath },
        });
        dispatch(logout());
        logoutUser({ userId });
      } else {
        setAuthorized(true);
      }
    };

    authCheck();

    const preventAccess = () => setAuthorized(false);

    router.events.on('routeChangeStart', preventAccess);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', preventAccess);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [dispatch, isLoggedIn, logoutUser, router, userId]);

  // CHILDREN RENDER
  if (isLoggedIn) {
    return children;
  }
  return authorized ? (
    children
  ) : (
    <div className="w-[100vw] h-[100vh] bg-white text-gray-600 font-normal text-base flex items-center justify-center">
      <RotatingLines
        strokeColor="#6A78D1"
        strokeWidth="5"
        animationDuration="0.8"
        width="45"
        visible={true}
      />
    </div>
  );
};

export default RouteGuard;
