import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/Posts/postSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    post: postReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch