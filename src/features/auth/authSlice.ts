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
  jwt_decoded,
  updateUserType,
  updateAccountWithoutPasswordType,
  updateAccountWithPasswordType,
  getUserType,
  reqFollowType,
  respFollowtype,
  reqUnFollowType
} from "./auth.types";

const initialState: stateType = {
  isUserLogin: false,
  id: "",
  status: "idle",
  token: "",
  firstname: "",
  profile_pic: "",
  following: [],
  followers: []
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
export const getUserData = createAsyncThunk(
  "/get-data",
  async ({ _id }: getUserType) => {
    const response = await axios.post<stateType>(
      "https://author-book-server.herokuapp.com/user/get-user-details",
      { _id: _id }
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
export const updateUser = createAsyncThunk(
  "/update-user",
  async ({ bio, image, URL, token }: updateUserType) => {
    const response = await axios.post<ReceivedUserType>(
      "https://author-book-server.herokuapp.com/user/updateUser",
      { bio, profile_pic: image, url: URL },
      { headers: { authorization: token } }
    );
    return response.data;
  }
);
export const updateAccountWithoutPassword = createAsyncThunk(
  "/update-account-without-password",
  async ({ firstname, lastname, email, phone, token }: updateAccountWithoutPasswordType) => {
    const response = await axios.post<signinData>(
      "https://author-book-server.herokuapp.com/account/update",
      { firstname, lastname, email, phone },
      { headers: { authorization: token } }
    );
    return response.data;
  }
);
export const updateAccountWithPassword = createAsyncThunk(
  "/update-account-without-password",
  async ({ firstname, lastname, email, phone, oldpassword, newpassword, token }: updateAccountWithPasswordType) => {
    const response = await axios.post<signinData>(
      "https://author-book-server.herokuapp.com/account/update",
      { firstname, lastname, email, phone, oldpassword, newpassword },
      { headers: { authorization: token } }
    );
    return response.data;
  }
);

export const followUser = createAsyncThunk(
  "/follow-user",
  async ({ _id, firstname, lastname, profile_pic, token }: reqFollowType) => {
    const response = await axios.post<respFollowtype>(
      "https://author-book-server.herokuapp.com/user/following",
      { _id, firstname, lastname, profile_pic },
      { headers: { authorization: token } }
    );
    return response.data;
  }
);

export const unFollowUser = createAsyncThunk(
  "/follow-user",
  async ({ _id, token }: reqUnFollowType) => {
    const response = await axios.delete<respFollowtype>(
      "https://author-book-server.herokuapp.com/user/following",
      {
        headers: { authorization: token },
        data: { _id}
      }
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
      .addCase(SignInUser.rejected, (state) => {
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
      .addCase(LoginUser.rejected, (state) => {
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
      .addCase(AddUserDetails.rejected, (state) => {
        state.status = "error";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
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
      .addCase(updateUser.rejected, (state) => {
        state.status = "error";
      })
      .addCase(updateAccountWithoutPassword.pending || updateAccountWithPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAccountWithoutPassword.fulfilled || updateAccountWithPassword.fulfilled, (state, action) => {
        state.status = "done";
        state.isUserLogin = true;
        state.token = action.payload.id;
        state.firstname = action.payload.firstname;
        const localData = localStorage?.getItem("Authorbook");
        if (localData) {
          const localDataParsed = JSON.parse(localData);
          const { profile_pic } = localDataParsed;
          localStorage.setItem(
            "Authorbook",
            JSON.stringify({
              isUserLoggedIn: true,
              id: state.token,
              firstname: state.firstname,
              profile_pic
            })
          );
        }
      })
      .addCase(updateAccountWithoutPassword.rejected || updateAccountWithPassword.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(getUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = "done";
        state.following = action.payload.following;
        state.followers = action.payload.followers
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = "error";
      })
      .addCase(followUser.pending || unFollowUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled || unFollowUser.fulfilled, (state, action) => {
        state.status = "done";        
        state.following = action.payload.updatedFollowing;
      })
      .addCase(followUser.rejected || unFollowUser.rejected, (state) => {
        state.status = "error";
      })
  },
});

export const { setDataFromLocal, LogOut } = authSlice.actions;

export const getID = (state: reducerType) => state.auth.id;
export const getStatus = (state: reducerType) => state.auth.status;
export const getUserFollowingList = (state: reducerType) => state.auth.following
export const getUserFollowerList = (state: reducerType) => state.auth.followers
export default authSlice.reducer;
