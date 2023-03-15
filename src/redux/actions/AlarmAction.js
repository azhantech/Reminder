import {useSelector} from 'react-redux';
import * as types from '../types';

export const AddAlarmAction = data => {
  console.log('Daat from ADDALRM =========>', data);
  return async dispatch => {
    try {
      await dispatch({type: types.AddAlarm, payload: data});
    } catch (err) {
      console.log('Error from AddAlarm ====>', err);
    }
  };
};

export const removeAlaramAction = id => {
  return dispatch => {
    dispatch({
      type: types.DELETE_ALARM,
      alarmId: id,
    });
  };
};
export const UpdateAlarm = data => {
  return async dispatch => {
    try {
      await dispatch({type: types.EditAlarm, payload: data});
    } catch (err) {
      throw new Error(err);
    }
  };
};
export const getAlarms = () => {
  try {
    const data = useSelector(state => state?.AlarmReducer?.alarms);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
