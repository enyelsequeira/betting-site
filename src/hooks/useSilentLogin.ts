import useStore from '@/store/useStore';
import { useEffect } from 'react';

let refreshed = false;

const useSilentLogin = () => {
  const silentSignin = useStore((state) => state.silentSignin);

  useEffect(() => {
    if (!refreshed) {
      try {
        const user = JSON.parse(localStorage?.getItem('user_casino') as string);

        silentSignin({
          username: user.username,
          password: user.password,
          balance: user.balance,
          birthday: user.birthday,
        })
          .then(() => {
            console.log('redirecting to home');
          })
          .catch(async (e) => {
            console.error('Failed to get USER', e.code, e.message, e.error);
          });
        refreshed = true;
      } catch (error) {
        console.warn('Non-fatal error', error);
      }
    }
  }, [silentSignin]);
};

export default useSilentLogin;
