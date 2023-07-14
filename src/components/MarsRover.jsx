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
import { cameraTypes } from '../constants/constants';
import { useMarsRover } from '../hooks/useMarsRover';
import { MROCard } from './MROCard';
import { NoResults } from './NoResults';
import { ProgressLoader } from './ProgressLoader';

export const MarsRover = () => {
  const [startDate, setStartDate] = React.useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = React.useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [camera, setCamera] = React.useState('all');

  const {
    mroResponse,
    isLoading,
    error,
    fetchAPI,
  } = useMarsRover(1, camera === 'all' ? null : camera);

  if (isLoading) return <ProgressLoader />;

  if (error) return null;

  return (
    <Container>
      <Typography gutterBottom={true} variant="h5" component="div">
        Mars Rover Photos
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
          rowGap="1rem"
          flexWrap="wrap"
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
            value={camera}
            label="Type"
            onChange={(e) => setCamera(e.target.value)}
          >
            {
                            cameraTypes.map((item) => (
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
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        columnGap="1rem"
        rowGap="1rem"
        sx={{
          my: 2,
        }}
      >
        {
          mroResponse.length === 0 ? <NoResults />
            : mroResponse?.map((item) => (
              <MROCard key={item.id} item={item} />
            ))
        }
      </Grid>
    </Container>
  );
};
