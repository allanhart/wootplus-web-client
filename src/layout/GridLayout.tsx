import { ReactElement } from "react";
import Head from "next/head";

import Box from "@mui/material/Box";

import ApplicationBar from "components/ApplicationBar";
import ApplicationFooter from "components/ApplicationFooter";


function GridLayout(
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
        maxContainerWidth={false}
        toolbarItems={toolbarItems}
      />

      <Box
        component="main"
        sx={{
          position: 'fixed',
          overflow: 'auto',
          top: {
            xs: 56, sm: 64,
          },
          bottom: 48,
          right: 0,
          left: { xs: 0, lg: '300px' },
        }}
      >
        {children}
      </Box>

      <ApplicationFooter />
    </>
  );
}

export default GridLayout;
