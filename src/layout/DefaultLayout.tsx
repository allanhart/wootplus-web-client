import { ReactElement } from "react";
import Head from "next/head";

import Container from "@mui/material/Container";
import { Breakpoint } from '@mui/system';

import ApplicationBar from "components/ApplicationBar";
import ApplicationFooter from "components/ApplicationFooter";


export default function DefaultLayout(
  {
    children,
    layout = 'flow',
    maxContainerWidth = 'lg',
    pageTitle,
    toolbarItems = undefined,
  }: {
    children: ReactElement,
    layout?: 'flow' | 'absolute',
    maxContainerWidth?: Breakpoint | false,
    pageTitle: string,
    toolbarItems?: ReactElement | undefined,
}) {
  const containerStyles = {
    pt: { xs: 7, sm: 8 },
    pb: 6,
  };

  if (layout === 'absolute') {
    Object.assign(containerStyles, {
      width: '100vw',
      height: '100vh',
    });
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <ApplicationBar
        hideOnScroll={layout === 'flow'}
        maxContainerWidth={maxContainerWidth}
        toolbarItems={toolbarItems}
      />

      <Container
        component="main"
        maxWidth={maxContainerWidth}
        disableGutters
        sx={containerStyles}
      >
        {children}
      </Container>

      <ApplicationFooter
        hideOnScroll={layout === 'flow'}
      />
    </>
  );
}
