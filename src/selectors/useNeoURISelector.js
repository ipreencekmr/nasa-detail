import { useSelector } from 'react-redux';

export const useNeoUri = () => useSelector((state) => state.getIn(['config', 'neoUri']));
