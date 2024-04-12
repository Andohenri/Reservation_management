import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   notifExpand: false,
   notifications: []
}
const notifSlice = createSlice({
    name: 'notif',
    initialState,
    reducers: {
      setNotifications: (state, action) => {
         state.notifications.push(action.payload);
      },
      setNotifExpand: (state, action) => {
         state.notifExpand = !action.payload;
      }
    }
});

export const { setNotification, setNotifExpand } = notifSlice.actions;
export default notifSlice.reducer;