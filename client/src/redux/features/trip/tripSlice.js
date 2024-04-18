import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   query: {
      departure_date: '',
      origin: '',
      destination: ''
   }
}
const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
      setSearchQuery: (state, action) => {
         state.query = action.payload;
      }
    }
});

export const { setSearchQuery } = tripSlice.actions;
export default tripSlice.reducer;