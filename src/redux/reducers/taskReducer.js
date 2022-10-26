import {createSlice, current} from '@reduxjs/toolkit';

const initialState = {
  totalData: [],
  tasks: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      // state.totalData = [];
      state['totalData'].push(action.payload);
    },

    addTask: (state, action) => {
      state['totalData'].map((item, index) => {
        if (item.name === action.payload.category) {
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

    onLoggingOut: state => {
      state.totalData = [];
      state.tasks = null;
    },
  },
});

export const {
  addCategory,
  editCategory,
  addTask,
  deleteTask,
  onTaskStatusChange,
  onLoggingOut,
} = taskSlice.actions;

export default taskSlice.reducer;
