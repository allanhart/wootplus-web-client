import { useContext, ReactElement } from 'react';

import AppBar from "@mui/material/AppBar";
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

function PersistentAppBar({ children }: {
  children: ReactElement,
}): ReactElement {
  const trigger = useScrollTrigger({
    threshold: 100,
    // disableHysteresis: true,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


export default function ApplicationBar({ maxContainerWidth }: {
  maxContainerWidth?: Breakpoint,
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


  return (
    <PersistentAppBar>
      <AppBar color="default" elevation={1}>
        <Container maxWidth={maxContainerWidth}>
          <Toolbar disableGutters>
            <ApplicationMenuButton />
          </Toolbar>
        </Container>

        {progressBar}
      </AppBar>
    </PersistentAppBar>
  );
}
