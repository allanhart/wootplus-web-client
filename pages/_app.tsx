import type { ReactElement, ReactNode } from 'react';
import { useCallback, useState } from 'react';

import Head from 'next/head';
import Script from 'next/script'

import type { NextPage } from 'next';
import { AppProps as NextAppProps } from 'next/app';
import { NextRouter, useRouter } from 'next/router';

import { CacheProvider, EmotionCache } from '@emotion/react';

import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';


import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import createEmotionCache from 'style/createEmotionCache';
import theme from 'style/theme';

import DefaultLayout from 'layout/DefaultLayout';

import AppContext, { AppContextInterface } from "AppContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      // staleTime: 0,
    },
  },
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, router:NextRouter) => ReactNode,
  pageTitle?: string,
}

interface AppProps extends NextAppProps {
  Component: NextPageWithLayout,
  emotionCache?: EmotionCache;
}


export default function App(props: AppProps) {
  const router = useRouter();

  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps
  } = props;

  const [loadProgress, setLoadProgress] = useState(null);

  const updateAppContext = useCallback((context:AppContextInterface) => {
    Object.keys(context).forEach((key) => {
      const value = context[key];
      switch (key) {
        case 'loadProgress':
          setLoadProgress(value);
          break;
        default:
          throw new Error(`Unexpected context key/value pair: (${key}=${value})`);
      }
    });
  }, []);

  const getLayout = Component.getLayout ?? ((page) => (
    <DefaultLayout
      pageTitle={Component.pageTitle ?? process.env.NEXT_PUBLIC_APP_TITLE ?? 'My Application'}
    >
      {page}
    </DefaultLayout>
  ));

  return (
    <>
      <Script src="/js/lib/ForerunnerDB-2.0.22/fdb-core+persist.min.js" />

      <QueryClientProvider client={queryClient}>
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}

        <CacheProvider value={emotionCache}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>

          <AppContext.Provider value={{
            loadProgress,
            update: updateAppContext,
          }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              {getLayout(<Component {...pageProps} />, router)}
            </ThemeProvider>
          </AppContext.Provider>
        </CacheProvider>
      </QueryClientProvider>
    </>
  );
}
