import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  stateType,
  signinData,
  loginData,
  reducerType,
  LoginType,
  SignInType,
  AddUserType,
  ReceivedUserType,
  jwt_decoded
} from "./auth.types";

const initialState: stateType = {
  isUserLogin: false,
  id: "",
  status: "idle",
  token: "",
  firstname: "",
  profile_pic: "",
};

export const SignInUser = createAsyncThunk(
  "/signin",
  async ({ firstName, lastName, email, phone, password }: SignInType) => {
    const response = await axios.post<signinData>(
      "https://author-book-server.herokuapp.com/account/signup",
      { firstname: firstName, lastname: lastName, email, phone, password }
    );
    return response.data;
  }
);

export const LoginUser = createAsyncThunk(
  "/login",
  async ({ email, password }: LoginType) => {
    const response = await axios.post<loginData>(
      "https://author-book-server.herokuapp.com/account/login",
      { email, password }
    );
    return response.data;
  }
);

export const AddUserDetails = createAsyncThunk(
  "/add-user-details",
  async ({ bio, URL, image }: AddUserType) => {
    const localData = localStorage?.getItem("Authorbook");
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
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDataFromLocal(state) {
      const localData = localStorage?.getItem("Authorbook");
      if (localData) {
        const localDataParsed = JSON.parse(localData);
        let { isUserLoggedIn, id, firstname, profile_pic } = localDataParsed;
        state.isUserLogin = isUserLoggedIn;
        state.status = "idle";
        state.token = id;
        id = jwt_decode(id)
        state.id = id.id;
        state.firstname = firstname;
        state.profile_pic = profile_pic;
      }
    },
    LogOut(state) {
      localStorage.removeItem("Authorbook");
      state.isUserLogin = false;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SignInUser.fulfilled, (state, action) => {
        const { id }: jwt_decoded = jwt_decode(action.payload.id)
        state.status = "done";
        state.isUserLogin = true;
        state.token = action.payload.id;
        state.id = id;
        state.firstname = action.payload.firstname;
        localStorage.setItem(
          "Authorbook",
          JSON.stringify({
            isUserLoggedIn: true,
            id: state.token,
            firstname: state.firstname,
          })
        );
      })
      .addCase(SignInUser.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(LoginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        const { id }: jwt_decoded = jwt_decode(action.payload.id)
        state.status = 'done';
        state.isUserLogin = true;
        state.token = action.payload.id;
        state.id = id;
        state.firstname = action.payload.firstname;
        state.profile_pic = action.payload.profile_pic;
        localStorage.setItem(
          "Authorbook",
          JSON.stringify({
            isUserLoggedIn: true,
            id: state.token,
            firstname: state.firstname,
            profile_pic: state.profile_pic,
          })
        );
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(AddUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddUserDetails.fulfilled, (state, action) => {
        state.status = "done";
        state.profile_pic = action.payload.profile_pic;
        const localData = localStorage?.getItem("Authorbook");
        if (localData) {
          const localDataParsed = JSON.parse(localData);
          const { id, firstname } = localDataParsed;
          localStorage.setItem(
            "Authorbook",
            JSON.stringify({
              isUserLoggedIn: true,
              id,
              firstname,
              profile_pic: state.profile_pic,
            })
          );
        }
      })
      .addCase(AddUserDetails.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { setDataFromLocal, LogOut } = authSlice.actions;

export const getID = (state: reducerType) => state.auth.id;
export const getStatus = (state: reducerType) => state.auth.status;

export default authSlice.reducer;
