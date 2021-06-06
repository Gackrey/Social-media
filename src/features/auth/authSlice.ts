import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { stateType, signinData, loginData, reducerType, LoginType, SignInType, AddUserType, ReceivedUserType } from './auth.types'

const initialState: stateType = {
  isUserLogin: false,
  status: 'idle',
  token: '',
  firstname: '',
  lastname: '',
  email: '',
  bio: '',
  profile_pic: '',
  url: ''
};

export const SignInUser = createAsyncThunk("/signin",
  async ({ firstName, lastName, email, phone, password }: SignInType) => {
    const response = await axios.post<signinData>(
      "https://author-book-server.herokuapp.com/account/signup",
      { firstname: firstName, lastname: lastName, email, phone, password }
    );
    return response.data;
  });

export const LoginUser = createAsyncThunk("/login",
  async ({ email, password }: LoginType) => {
    const response = await axios.post<loginData>(
      "https://author-book-server.herokuapp.com/account/login",
      { email, password }
    );
    return response.data;
  });

export const AddUserDetails = createAsyncThunk("/add-user-details",
  async ({ bio, URL, image }: AddUserType) => {
    const localData = localStorage?.getItem("Authorbook")
    let auth;
    if (localData) {
      const localDataParsed = JSON.parse(localData);
      const { id } = localDataParsed;
      auth = id;
    }
    const response = await axios.post<ReceivedUserType>(
      "https://author-book-server.herokuapp.com/user/add-user-details",
      { bio, url: URL, profile_pic: image, followers: [], following: [] },
      { headers: { authorization: auth } }
    );
    return response.data;
  });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setDataFromLocal(state) {
      const localData = localStorage?.getItem("Authorbook")
      if (localData) {
        const localDataParsed = JSON.parse(localData);
        const { isUserLogin, id, firstname, lastname, email, bio, profile_pic, url } = localDataParsed;
        state.isUserLogin = isUserLogin;
        state.status = 'idle';
        state.token = id;
        state.firstname = firstname;
        state.lastname = lastname;
        state.email = email;
        state.bio = bio;
        state.profile_pic = profile_pic;
        state.url = url;
      }
    },
    LogOut(state) {
      localStorage.removeItem("Authorbook");
      state.isUserLogin = false;
      state.token = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignInUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isUserLogin = true;
        state.token = action.payload.id;
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.email = action.payload.email;
        localStorage.setItem(
          "Authorbook",
          JSON.stringify({
            isUserLoggedIn: true,
            id: state.token,
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email
          })
        );
      })
      .addCase(SignInUser.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(LoginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isUserLogin = true;
        state.token = action.payload.id;
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.email = action.payload.email;
        state.bio = action.payload.bio;
        state.profile_pic = action.payload.profile_pic;
        state.url = action.payload.url;
        localStorage.setItem(
          "Authorbook",
          JSON.stringify({
            isUserLoggedIn: true,
            id: state.token,
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email,
            profile_pic: state.profile_pic,
            bio: state.bio,
            url: state.url
          })
        );
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(AddUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddUserDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.profile_pic = action.payload.profile_pic;
        state.bio = action.payload.bio;
        state.url = action.payload.url
        const localData = localStorage?.getItem("Authorbook")
        if (localData) {
          const localDataParsed = JSON.parse(localData);
          const { id, firstname, lastname, email } = localDataParsed;
          localStorage.setItem(
            "Authorbook",
            JSON.stringify({
              isUserLoggedIn: true,
              id,
              firstname,
              lastname,
              email,
              profile_pic: state.profile_pic,
              bio: state.bio,
              url: state.url
            })
          );
        }
      })
      .addCase(AddUserDetails.rejected, (state, action) => {
        state.status = 'error';
      })
  },
});

export const { LogOut } = authSlice.actions;

export const getID = (state: reducerType) => state.auth.token
export const getLoginState = (state: reducerType) => state.auth.isUserLogin

export default authSlice.reducer;
