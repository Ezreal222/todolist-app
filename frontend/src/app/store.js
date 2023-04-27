import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import taskReducer from '../features/tasks/taskSlice'
import listReducer from '../features/lists/listSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    lists: listReducer,
  },
})