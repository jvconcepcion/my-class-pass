import '@styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { HeaderNav, Provider, LoginBar } from '@components';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPathname = router.pathname;

  return (
    <>
      <Head>
        <title>ClassPass Clone</title>
        <meta name='description' content='A ClassPass homepage clone built with Next.js 14, TypeScript, and Tailwind CSS.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Provider>
        <HeaderNav pathname={currentPathname}>
          <LoginBar />
        </HeaderNav>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
