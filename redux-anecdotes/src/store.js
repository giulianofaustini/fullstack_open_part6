import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/anecdoteReducer";
import filterReducer from './reducers/filterReducer'
import notificationReducer from "./reducers/notificationReducer";




export const store = configureStore({
  reducer: {
    anecdotes: reducer,
    notification: notificationReducer,
    filter: filterReducer
  },
});
