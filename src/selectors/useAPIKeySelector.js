import { useSelector } from 'react-redux';

export const useApiKey = () => useSelector((state) => state.getIn(['config', 'apiKey']));
