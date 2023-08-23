import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector = () =>

export default useAppDispatch;
