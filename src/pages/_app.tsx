import '@styles/globals.css';
import Head from 'next/head';
import { HeaderNav } from '@components';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ClassPass Clone</title>
        <meta name='description' content='A ClassPass homepage clone built with Next.js 14, TypeScript, and Tailwind CSS.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <HeaderNav/>
      <Component {...pageProps} />
    </>
  )
}
