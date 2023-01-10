import { ReactElement } from "react";
import Head from "next/head";

import Container from "@mui/material/Container";
import { Breakpoint } from '@mui/system';

import ApplicationBar from "components/ApplicationBar";
import ApplicationFooter from "components/ApplicationFooter";


export default function DefaultLayout(
  {
    page,
    maxContainerWidth = 'lg',
    pageTitle,
    toolbarItems = undefined,
  }: {
    page: ReactElement,
    maxContainerWidth?: Breakpoint | false,
    pageTitle: string,
    toolbarItems?: ReactElement | undefined,
}) {

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <ApplicationBar
        hideOnScroll
        maxContainerWidth={maxContainerWidth}
        toolbarItems={toolbarItems}
      />

      <Container
        component="main"
        maxWidth={maxContainerWidth}
        disableGutters
        sx={{
          pt: { xs: 7, sm: 8 },
          pb: 6,
        }}
      >
        {page}
      </Container>

      <ApplicationFooter hideOnScroll />
    </>
  );
}
