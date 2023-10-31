import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      console.log(
        "state in set notification slice",
        JSON.parse(JSON.stringify(state))
      );
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;


export const setTimeoutNot = (message, timeout) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  }
}

export default notificationSlice.reducer;
