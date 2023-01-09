import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps as NextAppProps } from 'next/app';
import { EmotionCache } from "@emotion/react";


declare global {
  interface Window {
    gtag: (...args: any[]) => void
    ForerunnerDB: any,
  }
}

// For SCSS Modules
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, router:NextRouter) => ReactNode,
  pageTitle?: string,
}

export interface AppProps extends NextAppProps {
  Component: NextPageWithLayout,
  emotionCache?: EmotionCache;
}

export interface Tag {
  id: number,
  name: string,
  children: Tag[],
}

export interface WootItem {
  category: string,
  condition: string,
  date_end: string,
  date_start: string,
  discount: number,
  is_available_on_mobile_app_only:boolean,
  is_featured:boolean,
  is_fulfilled_by_amazon:boolean,
  is_sold_out:boolean,
  is_woot_off:boolean,
  list_price_min: number,
  list_price_max: number,
  min_price: number,
  max_price: number,
  sale_price_min: number,
  sale_price_max: number,
  photo_url: string,
  price: number,
  title: string,
  url: string,
  uuid: string,
}
