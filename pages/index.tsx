import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Link from 'components/Link';

import paths from 'paths';
import AppContext from "AppContext";

import { getWootItems } from 'io';

export default function Home() {
  const context = useContext(AppContext);
  const updateContext = context?.update;

  const {
    isLoading,
    error,
    // data
  } = useQuery(['getWootItems', {
   url: 'http://localhost:8000/woot-items/'
  }], getWootItems);


  useEffect(() => {
    updateContext({ loadProgress: isLoading ? undefined : null });
  }, [isLoading, updateContext]);


  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return (
    <Typography>
      An error has occurred: {error.toString()}
    </Typography>
    );
  }

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
