import { useRouter } from 'next/router';
import {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  logout,
  selectLoggedIn,
  selectUserId,
} from '../../lib/redux/authSlice/authSlice';
import { useLogoutMutation } from '../../lib/services/businessApi';
const publicPaths = [
  '/auth/login',
  '/auth/register',
  '/onboarding/verify-phone/verifyphone',
  '/onboarding/forgotpassword/forgotpassword',
];

const RouteGuard = (props: {
  children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
}) => {
  const { children } = props;

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const [logoutUser] = useLogoutMutation();
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

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

  // defining authCheck function
  // function authCheck(url: string) {
  //   // redirect to login page if accessing a private page and not logged in
  //   const publicPaths = [
  //     '/auth/login',
  //     '/auth/register',
  //     '/onboarding/verify-phone/verifyphone',
  //     '/onboarding/forgotpassword/forgotpassword',
  //   ];
  //   const path = url.split('?')[0];
  //   if (!isLoggedIn && !publicPaths.includes(path)) {
  //     setAuthorized(false);
  //     logoutUser({
  //       userId,
  //     })
  //       .unwrap()
  //       .then(() => {
  //         router.push({
  //           pathname: '/auth/login',
  //           query: { returnUrl: router.asPath },
  //         });
  //         dispatch(logout());
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         router.push({
  //           pathname: '/auth/login',
  //           query: { returnUrl: router.asPath },
  //         });
  //         dispatch(logout());
  //       });
  //   } else {
  //     setAuthorized(true);
  //   }
  // }

  return authorized ? (
    children
  ) : (
    <div className="w-[100vw] h-[100vh] bg-white text-gray-600 font-normal text-base flex items-center justify-center">
      Please wait...
    </div>
  );
};

export default RouteGuard;
