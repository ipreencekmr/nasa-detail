import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

export const MROCard = ({ item }) => {
  if (!item) return null;

  const {
    id,
    camera: {
      full_name: cameraFullName,
    },
    img_src: photoUrl,
    earth_date: earthDate,
    rover: {
      name: roverName,
      landing_date: landingDate,
      launch_date: launchDate,
      status: roverStatus,
      total_photos: totalPhotos,
    },
  } = { ...item };

  return (
    <Card
      sx={{ width: 300 }}
      elevation={6}
    >
      <CardHeader
        title={id}
        subheader={`Earth Date: ${dayjs(earthDate).format('DD MMMM, YYYY')}`}
      />
      <CardMedia
        component="img"
        height="194"
        src={photoUrl}
        alt={roverName}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            pb: '1rem',
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              fontWeight: 'fontWeightBold',
              color: 'gray',
            }}
          >
            {cameraFullName}
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          rowGap: '0.2rem',
        }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          >
            <Typography
              component="div"
              variant="body2"
              sx={{
                fontWeight: 'fontWeightBold',
                color: 'gray',
              }}
            >
              Launch Date
            </Typography>
            <Typography
              component="div"
              variant="body2"
              sx={{
                color: 'gray',
              }}
            >
              {dayjs(launchDate).format('DD MMM, YYYY')}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          >
            <Typography
              component="div"
              variant="body2"
              sx={{
                fontWeight: 'fontWeightBold',
                color: 'gray',
              }}
            >
              Landing Date
            </Typography>
            <Typography
              component="div"
              variant="body2"
              sx={{
                color: 'gray',
              }}
            >
              {dayjs(landingDate).format('DD MMM, YYYY')}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          >
            <Typography
              component="div"
              variant="body2"
              sx={{
                fontWeight: 'fontWeightBold',
                color: 'gray',
              }}
            >
              Rover Status
            </Typography>
            <Typography
              component="div"
              variant="body2"
              sx={{
                color: 'gray',
              }}
            >
              {roverStatus?.toUpperCase()}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            border: '1px dashed gray',
            p: '0.5rem',
            mt: '1rem',
          }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
            >
              <Typography
                component="span"
                variant="body1"
                color="text.secondary"
                sx={{
                  fontWeight: 'fontWeightBold',
                }}
              >
                Rover Name
              </Typography>
              <Typography
                component="span"
                variant="body1"
                color="text.secondary"
              >
                {roverName}
              </Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
            >
              <Typography
                component="span"
                variant="body1"
                color="text.secondary"
                sx={{
                  fontWeight: 'fontWeightBold',
                }}
              >
                Total Photos
              </Typography>
              <Typography
                component="span"
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: 'right' }}
              >
                {totalPhotos}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

MROCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    camera: PropTypes.shape({
      name: PropTypes.string,
      full_name: PropTypes.string,
    }),
    img_src: PropTypes.string,
    earth_date: PropTypes.string,
    rover: PropTypes.shape({
      name: PropTypes.string,
      landing_date: PropTypes.string,
      launch_date: PropTypes.string,
      status: PropTypes.string,
      total_photos: PropTypes.number,
    }),
  }),
};
