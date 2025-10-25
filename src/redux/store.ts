import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer"
import { getAllFinanceApi } from "./reducers/getFinanceQuery";
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [getAllFinanceApi.reducerPath]: getAllFinanceApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getAllFinanceApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)