import React from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { AsterCard } from './AsterCard';
import { useNeo } from '../hooks/useNeo';
import { NoResults } from './NoResults';
import { ProgressLoader } from './ProgressLoader';

export const Asteroids = () => {
  const [startDate, setStartDate] = React.useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = React.useState(dayjs(new Date()).format('YYYY-MM-DD'));

  const {
    neoResponse,
    isLoading,
    error,
    fetchAPI,
  } = useNeo(startDate, endDate);

  if (isLoading) return <ProgressLoader />;

  if (error) return null;

  return (
    <Container>
      <Typography gutterBottom={true} variant="h5" component="div">
        Max feed limit is 7 Days
      </Typography>
      <Grid
        container={true}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        rowGap="1rem"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          columnGap="1rem"
          flexGrow={1}
        >
          <TextField
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            variant="outlined"
          />

          <TextField
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            variant="outlined"
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button variant="outlined" onClick={() => fetchAPI()}>Refresh</Button>
        </Box>
      </Grid>
      <Grid
        container={true}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        columnGap="1rem"
        rowGap="1rem"
        sx={{
          my: 2,
          border: '1px dashed gray',
          padding: '1rem',
        }}
      >
        {
          neoResponse?.length === 0 ? <NoResults />
            : neoResponse?.map((item) => (
              <Grid item={true} key={item.name}>
                <AsterCard item={item} />
              </Grid>
            ))
        }
      </Grid>
    </Container>
  );
};
