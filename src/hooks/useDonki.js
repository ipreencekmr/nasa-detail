import React from 'react';
import { useSelector } from 'react-redux';

export const useDonki = (startDate, endDate, type) => {
  const nasaDomain = useSelector((state) => state.getIn(['config', 'nasaDomain']));
  const donkiUri = useSelector((state) => state.getIn(['config', 'donkiUri']));
  const apiKey = useSelector((state) => state.getIn(['config', 'apiKey']));

  const [isLoading, setIsLoading] = React.useState(false);
  const [donkiResponse, setDonkiResponse] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchAPI = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const BASE_URL = `${nasaDomain}${donkiUri}`;

      const paramStr = new URLSearchParams({
        type,
        start_date: startDate,
        end_date: endDate,
        api_key: apiKey,
      });

      const API_URL = `${BASE_URL}?${paramStr}`;

      const response = await fetch(API_URL);

      if (response.ok) {
        setDonkiResponse(await response.json());
        setError(null);
      }
    } catch (apiErr) {
      setError(apiErr);
      setDonkiResponse([]);
    }

    setIsLoading(false);
  }, [apiKey, nasaDomain, donkiUri, startDate, endDate, type]);

  React.useEffect(() => {
    fetchAPI();
  }, []);

  return {
    donkiResponse,
    isLoading,
    error,
    fetchAPI,
  };
};
