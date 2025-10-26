import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer"
import { getAllFinanceApi } from "./reducers/getFinanceQuery";
import { setupListeners } from '@reduxjs/toolkit/query'
import { postSalaryApi } from "./reducers/postSalaryMutation";
import { postFinanceApi } from "./reducers/postFinanceMutation";
import { deleteFinanceApi } from "./reducers/deleteFinanceMutation";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [getAllFinanceApi.reducerPath]: getAllFinanceApi.reducer,
        [postSalaryApi.reducerPath]: postSalaryApi.reducer,
        [postFinanceApi.reducerPath]: postFinanceApi.reducer,
        [deleteFinanceApi.reducerPath]: deleteFinanceApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                    .concat(getAllFinanceApi.middleware)
                    .concat(postSalaryApi.middleware)
                    .concat(postFinanceApi.middleware)
                    .concat(deleteFinanceApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)