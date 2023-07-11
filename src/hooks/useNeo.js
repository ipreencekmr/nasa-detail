import React from 'react';
import { useNasaDomain } from '../selectors/useNASADomainSelector';
import { useNeoUri } from '../selectors/useNeoURISelector';
import { useApiKey } from '../selectors/useAPIKeySelector';

export const useNeo = (startDate, endDate) => {
  const nasaDomain = useNasaDomain();
  const neoUri = useNeoUri();
  const apiKey = useApiKey();

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
      let responseList = [];

      if (response.ok) {
        const responseJson = await response.json();

        const neoEntries = Object.entries(responseJson?.near_earth_objects);
        responseList = neoEntries.reduce((accumulator, [key, value]) => {
          const asteroidObjects = value.map((item) => {
            const newItem = { ...item };
            newItem.date = key;
            return newItem;
          });
          return [...accumulator, ...asteroidObjects];
        }, []);
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
