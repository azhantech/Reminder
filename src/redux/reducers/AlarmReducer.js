import initialStates from './initialState';
import * as types from '../types';
import {useSelector} from 'react-redux';
const initialState = initialStates.alarmReducer;

const AlarmReducer = (state = initialState, action) => {
  console.log('Action.payload ==============>', action.payload);
  switch (action.type) {
    case types.AddAlarm:
      return {
        ...state,
        alarms: [...state.alarms, action?.payload],
      };

    case types.DELETE_ALARM: {
      let alarm = state.alarms;
      let index = alarm.findIndex(x => x.id == action.alarmId);

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
    case types.EditAlarm:
      let alarmData = [...state.alarms];
      for (var i = 0; i < alarmData.length; i++) {
        if (alarmData[i].id == action.payload?.id) {
          alarmData[i].name = action?.payload?.name;
          alarmData[i].time = action?.payload?.time;
          alarmData[i].custom = action?.payload?.custom;
          alarmData[i].snooze = action?.payload?.snooze;
          alarmData[i].ringOnce = action?.payload?.ringOnce;
          alarmData[i].vibrate = action?.payload?.vibrate;
          alarmData[i].ring = action?.payload?.ring;
        }
      }
      return {...state.alarms, alarms: alarmData};
    default:
      return state;
  }
};
export default AlarmReducer;
