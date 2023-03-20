import PushNotification from 'react-native-push-notification';
import { useSelector } from 'react-redux';
import { DeleteLocalNotification, LocalNotification } from '../../services/LocalPushController';
import { store } from '../store';
import * as types from '../types';

export const AddAlarmAction = data => {
  return async dispatch => {
    try {
      await dispatch({ type: types.AddAlarm, payload: data });
      LocalNotification(
        data?.id,
        data?.time,
        data?.vibrate,
        data?.snooze,
        data?.repeatType,
        'Alarm',
        data?.name,
      );
    } catch (err) {
      console.log('Error from AddAlarm ====>', err);
    }
  };
};
export const snoozeAlarm = data => {
  return async dispatch => {
    try {
      LocalNotification(
        data?.id,
        data?.time,
        data?.vibrate,
        data?.snooze,
        'Alarm',
        data?.name,
      );
    } catch (err) {
      console.log('Error from AddAlarm ====>', err);
    }
  };
};

export const removeAlaramAction = id => {
  return async dispatch => {
    try {
      await dispatch({
        type: types.DELETE_ALARM,
        alarmId: id,
      });
      DeleteLocalNotification(id);
    } catch (e) {
      console.log(e)
    }

  };

};
export const UpdateAlarm = data => {
  return async dispatch => {
    try {
      await DeleteLocalNotification(data?.id);
      setTimeout(() => {
        dispatch({ type: types.EditAlarm, payload: data });
        LocalNotification(
          Math.floor(Math.random() * 255),
          data?.time,
          data?.vibrate,
          data?.snooze,
          data?.repeatType,
          'Alarm',
          data?.name,
        );
      }, 1000)

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
