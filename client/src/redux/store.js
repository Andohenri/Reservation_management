import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import employeesReducer from './features/employee/employeeSlice';


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        employees: employeesReducer
    },
    middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(apiSlice.middleware),
    devtools: true,
})

setupListeners(store.dispatch)
export default store
