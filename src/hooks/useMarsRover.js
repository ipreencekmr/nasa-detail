import React from 'react';
import { useSelector } from 'react-redux';

export const useMarsRover = (page, camera) => {
  const nasaDomain = useSelector((state) => state.getIn(['config', 'nasaDomain']));
  const mroUri = useSelector((state) => state.getIn(['config', 'mroUri']));
  const apiKey = useSelector((state) => state.getIn(['config', 'apiKey']));

  const [isLoading, setIsLoading] = React.useState(false);
  const [mroResponse, setMroResponse] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchAPI = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const BASE_URL = `${nasaDomain}${mroUri}`;

      const paramStr = new URLSearchParams({
        sol: 1000,
        page,
        api_key: apiKey,
      });

      if (camera) {
        paramStr.append('camera', camera);
      }

      const API_URL = `${BASE_URL}?${paramStr}`;

      const response = await fetch(API_URL);

      if (response.ok) {
        const responseJson = await response.json();
        setMroResponse(responseJson.photos);
        setError(null);
      }
    } catch (apiErr) {
      setError(apiErr);
      setMroResponse([]);
    }

    setIsLoading(false);
  }, [nasaDomain, mroUri, apiKey]);

  React.useEffect(() => {
    fetchAPI();
  }, []);

  return {
    mroResponse,
    isLoading,
    error,
    fetchAPI,
  };
};
