import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

export const AsterCard = ({ item }) => {
  if (!item) return null;

  const {
    name,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: estimatedMinDiameter,
        estimated_diameter_max: estimatedMaxDiameter,
      },
    },
    absolute_magnitude_h: absoluteMagnitude,
    is_potentially_hazardous_asteroid: isHazardous,
  } = { ...item } || {};

  const diameterRange = `${Number(estimatedMinDiameter).toFixed(2)} - ${Number(estimatedMaxDiameter).toFixed(2)}`;

  return (
    <Card>
      <CardHeader
        title={name}
        avatar={
                isHazardous ? <ReportGmailerrorredIcon /> : <BookmarkAddedIcon />
            }
      />
      <CardContent>
        <Typography gutterBottom={true} variant="h6" component="div">
          Diameter: {diameterRange} kms
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Magnitude</strong>: { absoluteMagnitude }
        </Typography>
      </CardContent>
    </Card>
  );
};

AsterCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    estimated_diameter: PropTypes.shape({
      kilometers: PropTypes.shape({
        estimated_diameter_min: PropTypes.number,
        estimated_diameter_max: PropTypes.number,
      }),
    }),
    absolute_magnitude_h: PropTypes.number,
    is_potentially_hazardous_asteroid: PropTypes.bool,
  }),
};
