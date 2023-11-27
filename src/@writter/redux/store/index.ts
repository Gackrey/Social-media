import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../actions/auth";
import postReducer from "../actions/post";
import userReducer from "../actions/people";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
