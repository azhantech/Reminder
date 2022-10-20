import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogedIn: false,
  checkOnboarding: false,
  userName: '',
  emailId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLogIn: (state, action) => {
      state.isLogedIn = true;
      state.userName = action.payload.username;
      //   state.emailId = action.payload.email;
    },
    changeLogOut: state => {
      state.isLogedIn = false;
      state.userName = null;
      state.emailId = null;
      state.checkOnboarding = true;
    },
  },
});

export const {changeLogIn, changeLogOut} = authSlice.actions;

export default authSlice.reducer;
