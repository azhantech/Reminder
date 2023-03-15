import initialStates from './initialState';
import * as types from '../types';
const initialState = initialStates.alarmReducer;

const AlarmReducer = (state = initialState, action) => {
  console.log('Action.payload =========>', action);
  switch (action.type) {
    case types.AddAlarm:
      return {
        ...state,
        alarms: [...state.alarms, action?.payload],
      };
    default:
      return state;
  }
};

export default AlarmReducer;
