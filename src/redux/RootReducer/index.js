import {combineReducers} from 'redux';
import AlarmReducer from '../reducers/AlarmReducer';
const rootReducer = combineReducers({
  AlarmReducer: AlarmReducer,
});
export default rootReducer;
