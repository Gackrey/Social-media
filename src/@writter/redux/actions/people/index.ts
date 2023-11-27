import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@writter/constants";
import { userStateType, getUserListType, userReducerType } from "../../models";

const initialState: userStateType = {
  users: [],
  userStatus: "idle",
};

export const getUsers = createAsyncThunk("/get-users", async () => {
  const response = await axios.get<getUserListType>(
    `${API_URL}/user/show-all-users`
  );
  return response.data.results;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.userStatus = "done";
      })
      .addCase(getUsers.rejected, (state) => {
        state.userStatus = "error";
      });
  },
});

export const getUsersList = (state: userReducerType) => state.user.users;
export const getUserLoadStatus = (state: userReducerType) =>
  state.user.userStatus;

export default userSlice.reducer;
