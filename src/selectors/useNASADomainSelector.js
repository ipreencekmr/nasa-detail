import { useSelector } from 'react-redux';

export const useNasaDomain = () => useSelector((state) => state.getIn(['config', 'nasaDomain']));
