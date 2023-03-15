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

    case types.DELETE_ALARM: {
      let alarm = state.alarms;
      let index = alarm.findIndex((x) => x.id == action.alarmId);

      if (index > -1) {
        alarm.splice(index, 1);
        return {
          ...state,
          alarms: [...alarm],
        };
      } else {
        return {
          ...state,
        };
      }
    }
    default:
      return state;
  }
};

export default AlarmReducer;
