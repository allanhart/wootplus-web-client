import { ReactElement } from "react";
import Head from "next/head";

import Container from "@mui/material/Container";

import ApplicationBar from "components/ApplicationBar";
import ApplicationFooter from "components/ApplicationFooter";


export default function DefaultLayout(
  {
    children,
    pageTitle,
    toolbarItems = undefined,
  }: {
    children: ReactElement,
    pageTitle: string,
    toolbarItems?: ReactElement | undefined,
}) {

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <ApplicationBar
        hideOnScroll={false}
        maxContainerWidth={false}
        toolbarItems={toolbarItems}
      />

      <Container
        component="main"
        maxWidth={false}
        disableGutters
        sx={{
          pt: { xs: 7, sm: 8 },
          pb: 6,
          width: '100vw',
          height: '100vh',
        }}
      >
        {children}
      </Container>

      <ApplicationFooter
        hideOnScroll={false}
      />
    </>
  );
}
