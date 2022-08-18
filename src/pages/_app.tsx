import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import MainLayout from '@/layout';
import useStore from '@/store/useStore';
import useSilentLogin from '@/hooks/useSilentLogin';

function MyApp({ Component, pageProps }: AppProps) {
  useStore();
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  useSilentLogin();
  useEffect(() => {
    if (localStorage.getItem('casino_login') === 'true') {
      useStore.setState({
        isLoggedIn: true,
      });
    }
  }, [isLoggedIn]);
  return (
    <MainLayout>
      <Toaster position="top-center" />
      <Component {...pageProps} />;
    </MainLayout>
  );
}

export default MyApp;
