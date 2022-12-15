import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Link from 'components/Link';

import paths from 'paths';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box my={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js + TypeScript
        </Typography>

        <Link href={paths.about} color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Container>
  );
}
