import React from 'react';
import { Box, Typography } from '@mui/material';

export const NoResults = () => (
  <Box
    component="div"
    sx={{
      border: '1px dashed gray',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
      py: '4rem',
    }}
  >
    <Typography variant="h5">
      No Results Found!
    </Typography>
  </Box>
);
