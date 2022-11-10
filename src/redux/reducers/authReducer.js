import {createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

const initialState = {
  isLogedIn: false,
  checkOnboarding: false,
  emailId: '',
  passwordId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLogIn: (state, action) => {
      state.isLogedIn = true;
      state.emailId = action.payload.email;
      state.passwordId = action.payload.password;

      console.log('ACTION.PAYLOAD', state);
    },
    changeLogOut: state => {
      state.isLogedIn = false;
      state.emailId = null;
      state.passwordId = null;
      state.checkOnboarding = true;
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    },
  },
});

export const {changeLogIn, changeLogOut} = authSlice.actions;

export default authSlice.reducer;
