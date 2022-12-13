import React from "react";
import Head from 'next/head';

import Container from "@mui/material/Container";

import ApplicationBar from "components/ApplicationBar";
import Copyright from "components/Copyright";
import ProTip from "components/ProTip";

import styles from './DefaultLayout.module.scss';


export default function Layout({ children, pageTitle }: {
  children: React.ReactNode,
  pageTitle: string
}) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ApplicationBar />

      <Container className={styles.appContainer}>
        {children}

        <ProTip />
        <Copyright />
      </Container>
    </>
  );
}
