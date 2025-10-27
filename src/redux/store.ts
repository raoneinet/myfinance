import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer"
import { getAllFinanceApi } from "./reducers/getFinanceQuery";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [getAllFinanceApi.reducerPath]: getAllFinanceApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(getAllFinanceApi.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>