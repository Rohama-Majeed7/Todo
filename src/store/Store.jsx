// reducers.js
import TodoReducer from '../store/TodoSlice';
import { configureStore } from '@reduxjs/toolkit';
// Import other reducers as needed

const Store = configureStore({
  reducer: TodoReducer,
  // Add other reducers here
});

export default Store;
