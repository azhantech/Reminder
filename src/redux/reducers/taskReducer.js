import {createSlice, current} from '@reduxjs/toolkit';

const initialState = {
  totalData: [],
  tasks: null,
};

console.log('totalData', initialState.totalData);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      console.log('ADD action.payload', action.payload);
      // state.totalData = [];
      state['totalData'].push(action.payload);
    },

    addTask: (state, action) => {
      console.log('ADD TASK action.payload', action.payload);

      state['totalData'].map((item, index) => {
        if (item.name === action.payload.category) {
          console.log(
            'target object',
            current(state['totalData'][index]['task']),
          );
          state['totalData'][index]['task'].push(action.payload);
        }
      });
    },

    editCategory: (state, action) => {
      console.log('EDIT CATEGORY action.payload', action.payload);
      return {...state, totalData: {...state.totalData, ...action.payload}};
    },

    deleteTask: (state, action) => {
      console.log(action.payload);

      // state['totalData'].filter((item) => )

      // const newTotalData = state.totalData.filter(
      //   data => data.id !== action.payload,
      // );
      // state.totalData = newTotalData;
    },

    // ------------------- // -------------------

    onLoggingOut: state => {
      state.totalData = [];
      state.tasks = null;
    },
  },
});

export const {addCategory, editCategory, addTask, deleteTask, onLoggingOut} =
  taskSlice.actions;

export default taskSlice.reducer;
