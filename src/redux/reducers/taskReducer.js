import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {createSlice, current} from '@reduxjs/toolkit';
import moment from 'moment';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {iosLocalNotification} from '../../services/IosLocalPuchController';
import {LocalNotification} from '../../services/LocalPushController';

const initialState = {
  totalData: [],
  specificDateData: [],
  selectedDate: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateSelectedDate: (state, action) => {
      console.log('UPDATE SELECTED DATE', action);
      state['selectedDate'] = action.payload;
      state['totalData'].forEach(element => {
        console.log('element.date', element.date);
        if (element.date == action.payload) {
          console.log('specificDateData', element);
          state.specificDateData = [element];
        }
      });
    },

    addCategory: (state, action) => {
      state['totalData'].push(action.payload);
    },

    addTask: (state, action) => {
      state['totalData'].map((item, index) => {
        if (item.name === action.payload.category) {
          item.progress = 'Ongoing';
          state['totalData'][index]['task'].push(action.payload);
        }
      });
    },

    editTask: (state, action) => {
      state['totalData'].map((item, index) => {
        if (item.name === action.payload.category) {
          item['task'].map((value, number) => {
            if (value.notId === action.payload.notId) {
              state['totalData'][index]['task'][number] = action.payload;
            }
          });
        }
      });
    },

    editCategory: (state, action) => {
      state['totalData'].map((item, index) => {
        if (item.index === action.payload.index) {
          state['totalData'][index] = action.payload;

          item['task'].map((value, number) => {
            state['totalData'][index]['task'][number]['category'] =
              action.payload.name;
          });
        }
      });
    },

    deleteTask: (state, action) => {
      state['totalData'].map((item, index) => {
        if (item.name === action.payload.category) {
          const updatedValue = item['task'].filter(
            data => data.tname !== action.payload.id,
          );
          console.log(
            "state['totalData'][index]['task']['notId']",
            current(state['totalData'][index]['task']),
          );

          item['task'].map((value, number) => {
            if (Platform.OS === 'android') {
              if (value.notId == action.payload.startId) {
                PushNotification.cancelLocalNotification(
                  action.payload.startId,
                );
              }

              if (value.notEndId == action.payload.endId) {
                PushNotification.cancelLocalNotification(action.payload.endId);
              }
            }

            if (Platform.OS === 'ios') {
              if (value.notId == action.payload.startId) {
                PushNotificationIOS.removePendingNotificationRequests([
                  `${action.payload.startId}`,
                ]);

                PushNotificationIOS.removeDeliveredNotifications([
                  `${action.payload.startId}`,
                ]);
              }

              if (value.notEndId == action.payload.endId) {
                PushNotificationIOS.removePendingNotificationRequests([
                  `${action.payload.endId}`,
                ]);

                PushNotificationIOS.removeDeliveredNotifications([
                  `${action.payload.endId}`,
                ]);
              }
            }
          });

          state['totalData'][index]['task'] = updatedValue;
        } else {
          console.log('ELSE  BLOCK');
        }
      });
    },

    onTaskStatusChange: (state, action) => {
      if (action.payload.isChecked && !action.payload.item.completed) {
        state['totalData'].map((item, index) => {
          if (item.name === action.payload.item.category) {
            item['task'].map((value, num) => {
              if (value.tname === action.payload.item.tname) {
                value.completed = true;
                const startVal = moment(value.start_time, 'LT');

                if (startVal.format('LT') >= moment(new Date()).format('LT')) {
                  if (Platform.OS === 'android') {
                    PushNotification.cancelLocalNotification(value.notId);
                  }

                  if (Platform.OS === 'ios') {
                    PushNotificationIOS.removePendingNotificationRequests([
                      `${value.notId}`,
                    ]);

                    PushNotificationIOS.removeDeliveredNotifications([
                      `${value.notId}`,
                    ]);
                  }
                }
                if (Platform.OS === 'android') {
                  PushNotification.cancelLocalNotification(value.notEndId);
                }

                if (Platform.OS === 'ios') {
                  PushNotificationIOS.removePendingNotificationRequests([
                    `${value.notEndId}`,
                  ]);

                  PushNotificationIOS.removeDeliveredNotifications([
                    `${value.notEndId}`,
                  ]);
                }

                return value.completed;
              }
            });
          }
        });
      } else if (!action.payload.isChecked && action.payload.item.completed) {
        state['totalData'].map((item, index) => {
          if (item.name === action.payload.item.category) {
            item['task'].map((value, num) => {
              if (value.tname === action.payload.item.tname) {
                value.completed = false;

                const dateVal = moment(value.date, 'LL');
                const startVal = moment(value.start_time, 'LT');
                const endVal = moment(value.end_time, 'LT');

                let updatedValStart = dateVal
                  ?.hour(startVal ? startVal.hours() : dateVal.hours())
                  .minute(startVal ? startVal.minutes() : dateVal.minutes());

                if (
                  moment(startVal).format('LT') >=
                  moment(new Date()).format('LT')
                ) {
                  if (Platform.OS === 'android') {
                    LocalNotification(
                      value.notId,
                      updatedValStart,
                      `Time to do ${value.tname}`,
                      `Start doing ${value.tname}`,
                    );
                  }

                  if (Platform.OS === 'ios') {
                    iosLocalNotification(
                      value.notId,
                      updatedValStart,
                      `Time to do ${value.tname}`,
                      `Start doing ${value.tname}`,
                    );
                  }
                }

                let updatedValEnd = dateVal
                  ?.hour(endVal ? endVal.hours() : dateVal.hours())
                  .minute(endVal ? endVal.minutes() - 2 : dateVal.minutes());

                if (endVal.format('LT') >= moment(new Date()).format('LT')) {
                  if (Platform.OS === 'android') {
                    LocalNotification(
                      value.notEndId,
                      updatedValEnd,
                      `${value.tname} is approaching to end in 2 minutes`,
                      `${value.tname} Ending Alert`,
                    );
                  }

                  if (Platform.OS === 'ios') {
                    iosLocalNotification(
                      value.notEndId,
                      updatedValEnd,
                      `${value.tname} is approaching to end in 2 minutes`,
                      `${value.tname} Ending Alert`,
                    );
                  }
                }
                return value.completed;
              }
            });
          }
        });
      }
    },

    onCategoryProgressChange: (state, action) => {
      let counter = 0;
      let taskLength = 0;

      state['totalData'].forEach(element => {
        if (element.name == action.payload.category) {
          console.log('element', element);
          element.task.map((item, index) => {
            if (item.completed) {
              counter += 1;
            }
            taskLength = element.task.length;
          });
        }
      });

      state['totalData'].forEach(element => {
        if (element.name == action.payload.category) {
          if (counter == taskLength) {
            element.progress = 'Completed';
          } else {
            element.progress = 'Ongoing';
          }
        }
      });
    },

    onLoggingOut: state => {
      state.totalData = [];
      state.specificDateData = [];
      state.tasks = null;
    },
  },
});

export const {
  updateSelectedDate,
  onCategoryProgressChange,
  addCategory,
  editCategory,
  addTask,
  editTask,
  deleteTask,
  onTaskStatusChange,
  onLoggingOut,
} = taskSlice.actions;

export default taskSlice.reducer;
