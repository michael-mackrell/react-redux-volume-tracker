import { combineReducers } from 'redux';
import dayReducer from './dayReducer';

export default combineReducers({
  day: dayReducer
});
