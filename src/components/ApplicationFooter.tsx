import Box from "@mui/material/Box";
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';


function ApplicationFooter() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'grey.200',
        borderTopWidth: 1,
        borderTopColor: 'divider',
        borderTopStyle: 'solid',
        height: (theme) => theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://mui.com/">
          Your Website
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}

export default ApplicationFooter;
