import React from 'react';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

export const ProgressLoader = () => (
  <Container sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '40vh',
  }}
  >
    <CircularProgress color="success" />
  </Container>
);
