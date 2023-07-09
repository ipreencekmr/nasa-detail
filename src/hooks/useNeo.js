import React from 'react';
import { useSelector } from 'react-redux';

export const useNeo = (startDate, endDate) => {
  const nasaDomain = useSelector((state) => state.getIn(['config', 'nasaDomain']));
  const neoUri = useSelector((state) => state.getIn(['config', 'neoUri']));
  const apiKey = useSelector((state) => state.getIn(['config', 'apiKey']));

  const [isLoading, setIsLoading] = React.useState(false);
  const [neoResponse, setNeoResponse] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchAPI = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const BASE_URL = `${nasaDomain}${neoUri}`;

      const paramStr = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
        api_key: apiKey,
      });

      const API_URL = `${BASE_URL}?${paramStr}`;

      const response = await fetch(API_URL);
      const responseList = [];

      if (response.ok) {
        const responseJson = await response.json();

        for (const [key, value] of Object.entries(responseJson?.near_earth_objects)) {
          console.log(`${key}: ${value}`);

          const asteroidObjects = value.map((item) => {
            const newItem = { ...item };
            newItem.date = key;
            return newItem;
          });
          responseList.push(...asteroidObjects);
        }
      }

      setNeoResponse(responseList);
      setError(null);
    } catch (apiErr) {
      setError(apiErr);
      setNeoResponse([]);
    }

    setIsLoading(false);
  }, [nasaDomain, neoUri, apiKey, startDate, endDate]);

  React.useEffect(() => {
    fetchAPI();
  }, []);

  return {
    neoResponse,
    isLoading,
    error,
    fetchAPI,
  };
};
