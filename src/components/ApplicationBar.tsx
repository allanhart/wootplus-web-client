import { useContext, ReactElement } from 'react';

import { useRouter } from 'next/router';

import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Slide from '@mui/material/Slide';
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { styled, Theme } from "@mui/material/styles";

import { Breakpoint, StandardCSSProperties } from '@mui/system';

import ApplicationMenuButton from "./ApplicationMenuButton";
import AppContext from "AppContext";
import { strToHslColor } from 'util/shortcuts';

const LINEAR_PROGRESS_STYLES = {
  bottom: 0,
  height: 3,
  position: 'absolute',
  width: '100%',
};

const StyledAppBar = styled(AppBar)<AppBarProps>(
  ({ theme }: { theme: Theme }) => ({
  transition: theme.transitions.create('background-color', {
    duration: 1000,
  }),
  zIndex: theme.zIndex.drawer + 1,
}));


function PersistentAppBar({ children, scrollTarget }: {
  children: ReactElement,
  scrollTarget: Node|Window|undefined,
}): ReactElement {
  const trigger = useScrollTrigger({
    // disableHysteresis: true,
    target: scrollTarget,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


export default function ApplicationBar(
  {
    hideOnScroll = false,
    maxContainerWidth,
    scrollTarget = undefined,
    toolbarItems = undefined,
}: {
    hideOnScroll?: boolean,
    maxContainerWidth?: Breakpoint|false,
    scrollTarget?: Node|Window|undefined,
    toolbarItems?: ReactElement | undefined,
}): ReactElement {
  const context = useContext(AppContext);
  const loadProgress = context?.loadProgress;

  const { query } = useRouter();
  const { category } = query;

  const sx:StandardCSSProperties = {};
  if (category) {
    const categoryParts:string[] = `${category}`.split('::');
    const primaryCategory = categoryParts.shift();
    sx.backgroundColor = strToHslColor(`${primaryCategory}`, 30, 50);
  }

  let progressBar = null;
  if (loadProgress !== null) {
    const progressBarProps: LinearProgressProps = {sx: LINEAR_PROGRESS_STYLES};

    if (loadProgress !== undefined) {
      progressBarProps.value = loadProgress;
      progressBarProps.variant = 'determinate';
    }

    progressBar = (
      <LinearProgress {...progressBarProps} />
    );
  }

  let view = (
    <StyledAppBar
      color="default"
      elevation={1}
      sx={sx}
    >
      <Container maxWidth={maxContainerWidth} disableGutters>
        <Toolbar disableGutters sx={{ px: 1 }}>
          <ApplicationMenuButton />

          {toolbarItems}
        </Toolbar>
      </Container>

      {progressBar}
    </StyledAppBar>
  );

  if (hideOnScroll) {
    view = (
      <PersistentAppBar scrollTarget={scrollTarget}>
        {view}
      </PersistentAppBar>
    );
  }

  return view;
}
