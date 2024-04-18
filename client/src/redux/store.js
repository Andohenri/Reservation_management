import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from './features/auth/authSlice.js'
import notifReducer from './features/notif/notifSlice.js'
import tripReducer from './features/trip/tripSlice.js'


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        notif: notifReducer,
        trip: tripReducer,
    },
    middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(apiSlice.middleware),
    devtools: true,
})

setupListeners(store.dispatch)
export default store
