import React from 'react';
import { cameraTypes } from '../constants/constants';
import { useMarsRover } from '../hooks/useMarsRover';

export const MarsRover = () => {
  const [camera, setCamera] = React.useState(null);

  const {
    mroResponse,
    isLoading,
    error,
    fetchAPI,
  } = useMarsRover(1, camera);

  if (isLoading || error) return null;

  return <div>MarsRover:{JSON.stringify(mroResponse)}</div>;
};
