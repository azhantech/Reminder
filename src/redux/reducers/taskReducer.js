import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  totalData: [],
  tasks: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getData: state => {
      return state.totalData;
    },
    addCategory: (state, action) => {},
    editCategory: (state, action) => {},
    addTask: (state, action) => {},
    deleteTask: (state, action) => {},
  },
});

export const {getData, addCategory, editCategory, addTask, deleteTask} =
  taskSlice.actions;

export default taskSlice.reducer;
