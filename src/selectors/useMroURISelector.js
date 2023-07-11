import { useSelector } from 'react-redux';

export const useMroUri = () => useSelector((state) => state.getIn(['config', 'mroUri']));
