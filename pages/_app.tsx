import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import client from '../lib/apolloClient';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}
