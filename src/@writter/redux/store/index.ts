import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../actions/auth";
import postReducer from "../actions/post";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
