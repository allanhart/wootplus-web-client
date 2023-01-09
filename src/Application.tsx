import { AppProps } from 'types';

import { useCallback, useState } from "react";
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { Theme } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';

import DefaultLayout from 'layout/DefaultLayout';

import { fetchTags } from "io/queries";

import AppContext, { AppContextInterface } from "AppContext";


export default function Application(props: AppProps) {
  const { Component, pageProps } = props;

  const router = useRouter();
  const isLargeUp = useMediaQuery((theme:Theme) => theme.breakpoints.up('lg'));

  const [loadProgress, setLoadProgress] = useState(null);

  const tagFetchResult = useQuery(['fetchTags'], fetchTags);

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
    <AppContext.Provider value={{
      isLargeUp,
      loadProgress,
      tags: tagFetchResult.data || [],
      update: updateAppContext,
    }}>
      {getLayout(<Component {...pageProps} />, router)}
    </AppContext.Provider>
  );
}

