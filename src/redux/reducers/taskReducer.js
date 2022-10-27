import {createSlice, current} from '@reduxjs/toolkit';

const initialState = {
  totalData: [],
  selectedDate: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateSelectedDate: (state, action) => {
      console.log('UPDATE SELECTED DATE', action);
    },

    addCategory: (state, action) => {
      // state.totalData = [];
      state['totalData'].push(action.payload);
    },

    addTask: (state, action) => {
      state['totalData'].map((item, index) => {
        if (item.name === action.payload.category) {
          // added for ongoing/completed flow
          item.progress = 'Ongoing';
          state['totalData'][index]['task'].push(action.payload);
        }
      });
    },

    editCategory: (state, action) => {
      state['totalData'].map((item, index) => {
        if (item.index === action.payload.index) {
          state['totalData'][index] = action.payload;
        }
      });
    },

    deleteTask: (state, action) => {
      state['totalData'].map((item, index) => {
        if (item.name === action.payload.category) {
          const updatedValue = item['task'].filter(
            data => data.tname !== action.payload.id,
          );

          state['totalData'][index]['task'] = updatedValue;
        } else {
          console.log('ELSE  BLOCK');
        }
      });
    },

    onTaskStatusChange: (state, action) => {
      console.log('onTaskStatusChange', action.payload);

      if (action.payload.isChecked && !action.payload.item.completed) {
        state['totalData'].map((item, index) => {
          if (item.name === action.payload.item.category) {
            item['task'].map((value, num) => {
              if (value.tname === action.payload.item.tname) {
                value.completed = true;
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
                return value.completed;
              }
            });
          }
        });
      }
    },

    onCategoryProgressChange: (state, action) => {
      console.log('onCategoryProgressChange', action.payload);

      let counter = 0;
      let taskLength = 0;

      state['totalData'].forEach(element => {
        console.log('element.category', element.name);
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
      console.log('counter', counter);
      console.log('tasklength', taskLength);

      if (counter == taskLength) {
        state['totalData'].forEach(element => {
          if (element.name == action.payload.category) {
            element.progress = 'Completed';
          } else {
            element.progress = 'Ongoing';
          }
        });
      }
    },

    onLoggingOut: state => {
      state.totalData = [];
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
  deleteTask,
  onTaskStatusChange,
  onLoggingOut,
} = taskSlice.actions;

export default taskSlice.reducer;
