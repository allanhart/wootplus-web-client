import { useContext, ReactElement } from 'react';
import { styled, Theme } from "@mui/material/styles";

import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

import Slide from '@mui/material/Slide';
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Breakpoint } from '@mui/system';

import ApplicationMenuButton from "./ApplicationMenuButton";

import AppContext from "AppContext";

const LINEAR_PROGRESS_STYLES = {
  bottom: 0,
  height: 3,
  position: 'absolute',
  width: '100%',
};

const StyledAppBar = styled(AppBar)<AppBarProps>(
  ({ theme }: { theme: Theme }) => ({
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
    <StyledAppBar color="default" elevation={1}>
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
