import {createSlice, createAction} from '@reduxjs/toolkit';

const initialState = {
  totalData: [],
  tasks: null,
};

console.log('totalData', initialState.totalData);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getData: state => {
      return state.totalData;
    },
    addCategory: (state, action) => {
      console.log('ADD action.payload', action.payload);
      // state.totalData = [];
      state['totalData'].push(action.payload);
    },
    editCategory: (state, action) => {},
    addTask: (state, action) => {},
    deleteTask: (state, action) => {},
    onLoggingOut: state => {
      state.totalData = [];
      state.tasks = null;
    },
  },
});

export const {
  getData,
  addCategory,
  editCategory,
  addTask,
  deleteTask,
  onLoggingOut,
} = taskSlice.actions;

export default taskSlice.reducer;
