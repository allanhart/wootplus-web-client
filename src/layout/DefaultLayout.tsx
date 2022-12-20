import { ReactElement } from "react";
import Head from 'next/head';

import Container from "@mui/material/Container";

import ApplicationBar from "components/ApplicationBar";
import ApplicationFooter from "components/ApplicationFooter";


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

      <Container
        component="main"
        disableGutters
        sx={{
          pt: { xs: 7, sm: 8 },
          pb: 8,
        }}
      >
        {children}
      </Container>

      <ApplicationFooter />
    </>
  );
}
