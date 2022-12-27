import Box, { BoxProps } from "@mui/material/Box";
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {ReactElement} from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import {styled, Theme} from "@mui/material/styles";


const StyledFooter = styled(Box)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.grey[200],
    borderTopWidth: 1,
    borderTopColor: 'divider',
    borderTopStyle: 'solid',
    height: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}));

function PersistentFooter({ children, target = undefined }: {
  children: ReactElement,
  target?: Node|Window|undefined,
}): ReactElement {
  const trigger = useScrollTrigger({
    // disableHysteresis: true,
    target,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

function ApplicationFooter() {
  return (
    <PersistentFooter>
      <StyledFooter component="footer">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <MuiLink color="inherit" href="https://mui.com/">
            Your Website
          </MuiLink>{' '}
          {new Date().getFullYear()}.
        </Typography>
      </StyledFooter>
    </PersistentFooter>
  );
}

export default ApplicationFooter;
