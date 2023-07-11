import { useSelector } from 'react-redux';

export const useDonkiUri = () => useSelector((state) => state.getIn(['config', 'donkiUri']));
