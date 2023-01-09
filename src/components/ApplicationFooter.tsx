import Box, { BoxProps } from "@mui/material/Box";
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {ReactElement} from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { styled, Theme } from "@mui/material/styles";


const StyledFooter = styled(Box)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.grey[200],
    borderTopWidth: 1,
    borderTopColor: theme.palette.divider,
    borderTopStyle: 'solid',
    height: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}));

function PersistentFooter({ children, scrollTarget = undefined }: {
  children: ReactElement,
  scrollTarget?: Node|Window|undefined,
}): ReactElement {
  const trigger = useScrollTrigger({
    // disableHysteresis: true,
    target: scrollTarget,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function ApplicationFooter({
  hideOnScroll = false,
  scrollTarget = undefined
}: {
  hideOnScroll?: boolean,
  scrollTarget?: Node|Window|undefined,
}): ReactElement {
  let view = (
    <StyledFooter component="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://mui.com/">
          Your Website
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </StyledFooter>
  );

  if (hideOnScroll) {
    view = (
      <PersistentFooter scrollTarget={scrollTarget}>
        {view}
      </PersistentFooter>
    )
  }

  return view;
}
