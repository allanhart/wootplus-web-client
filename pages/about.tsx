import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Link from 'components/Link';

import paths from 'paths';

export default function About() {
  return (
    <Container maxWidth="lg">
      <Box my={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          About this template
        </Typography>

        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href={paths.index}>
            Go to the home page
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
