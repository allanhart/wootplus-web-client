import type { AppProps } from 'types';
import { useCallback, useState } from 'react';

import Head from 'next/head';
import Script from 'next/script'


import { CacheProvider } from '@emotion/react';

import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';


import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import createEmotionCache from 'style/createEmotionCache';
import theme from 'style/theme';


import Application from 'Application';

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


export default function AppWrapper(props: AppProps) {
  const {
    emotionCache = clientSideEmotionCache,
  } = props;


  const [isForeRunnerLoaded, setIsForeRunnerLoaded] = useState(false);

  const handleForerunnerDBLoad = useCallback(() => {
    setIsForeRunnerLoaded(true);
  }, []);


  let view;
  if (isForeRunnerLoaded) {
    view = <Application {...props} />;
  } else {
    console.log('TODO: render preloader');
    view = null;
  }

  return (
    <>
      <Script
        src="/js/lib/ForerunnerDB-2.0.22/fdb-core+persist.min.js"
        onLoad={handleForerunnerDBLoad}
      />

      <QueryClientProvider client={queryClient}>
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}

        <CacheProvider value={emotionCache}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>

          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            {view}
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </>
  );
}
