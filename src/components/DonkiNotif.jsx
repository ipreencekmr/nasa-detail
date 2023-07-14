import React from 'react';
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { notifTypes } from '../constants/constants';
import { DonkiCard } from './DonkiCard';
import { useDonki } from '../hooks/useDonki';
import { NoResults } from './NoResults';
import { ProgressLoader } from './ProgressLoader';

export const DonkiNotif = () => {
  const [startDate, setStartDate] = React.useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = React.useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [type, setType] = React.useState('all');

  const {
    donkiResponse,
    isLoading,
    error,
    fetchAPI,
  } = useDonki(startDate, endDate, type);

  if (isLoading) return <ProgressLoader />;

  if (error) return null;

  return (
    <Container>
      <Typography gutterBottom={true} variant="h5" component="div">
        Donki Notifications
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

          <Select
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            {
                            notifTypes.map((item) => (
                              <MenuItem
                                key={item}
                                value={item}
                              >{item}
                              </MenuItem>
                            ))
                        }
          </Select>
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
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        rowGap="1rem"
        sx={{
          my: 2,
        }}
      >
        {
          donkiResponse?.length === 0 ? <NoResults />
            : donkiResponse?.map((item) => (
              <DonkiCard key={item.messageID} item={item} />
            ))
        }
      </Grid>
    </Container>
  );
};
