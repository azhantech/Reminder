import * as types from '../types';

export const AddAlarmAction = data => {
  console.log('Daat from ADDALRM =========>', data);
  return async dispatch => {
    try {
      dispatch({ type: types.AddAlarm, payload: data });
    } catch (err) {
      console.log('Error from AddAlarm ====>', err);
    }
  };
};

export const removeAlaramAction = (id) => {
  return (dispatch) => {
    dispatch({
      type: types.DELETE_ALARM,
      alarmId: id,
    });
  };
};
