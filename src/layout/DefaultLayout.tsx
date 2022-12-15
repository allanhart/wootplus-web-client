import { ReactElement } from "react";
import Head from 'next/head';

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";


import ApplicationBar from "components/ApplicationBar";
import Copyright from "components/Copyright";
import ProTip from "components/ProTip";

// import styles from './DefaultLayout.module.scss';


export default function DefaultLayout({ children, pageTitle }: {
  children: ReactElement,
  pageTitle: string
}) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ApplicationBar maxContainerWidth={false} />

      <Container>
        <Box py={{ xs: 7, sm: 8 }}>
          {children}

          <ProTip />
          <Copyright />

        </Box>
      </Container>
    </>
  );
}
