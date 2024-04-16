import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   notifExpand: false,
   notifications: [],
   notification: {}
}
const notifSlice = createSlice({
    name: 'notif',
    initialState,
    reducers: {
      setNotifications: (state, action) => {
         state.notifications = action.payload;
      },
      setNotification: (state, action) => {
         state.notifications.push(action.payload);
      },
      setNotifExpand: (state, action) => {
         state.notifExpand = !action.payload;
      }
    }
});

export const { setNotification, setNotifExpand, setNotifications } = notifSlice.actions;
export default notifSlice.reducer;