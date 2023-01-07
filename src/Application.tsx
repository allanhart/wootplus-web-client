import { NextPageWithLayout } from 'types';
import { AppProps as NextAppProps } from 'next/app';
import { useRouter } from 'next/router';

import { useQuery } from 'react-query';

import DefaultLayout from 'layout/DefaultLayout';

import { fetchTags } from "io/queries";

import AppContext, { AppContextInterface } from "AppContext";
import {useCallback, useState} from "react";


interface ApplicationProps extends NextAppProps {
  Component: NextPageWithLayout,
}

export default function Application(props: ApplicationProps) {
  const { Component, pageProps } = props;

  const router = useRouter();
  const [loadProgress, setLoadProgress] = useState(null);

  const tagFetchResult = useQuery(['fetchTags'], fetchTags);
  console.log(tagFetchResult.data);

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
      loadProgress,
      tags: tagFetchResult.data,
      update: updateAppContext,
    }}>
      {getLayout(<Component {...pageProps} />, router)}
    </AppContext.Provider>
  );
}

