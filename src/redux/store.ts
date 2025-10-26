import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer"
import { getAllFinanceApi } from "./reducers/getFinanceQuery";
import { setupListeners } from '@reduxjs/toolkit/query'
import { postSalaryApi } from "./reducers/postSalaryMutation";
import { postFinanceApi } from "./reducers/postFinanceMutation";
import { deleteFinanceApi } from "./reducers/deleteFinanceMutation";
import { getFinanceUpdateApi } from "./reducers/updateFinanceQuery";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [getAllFinanceApi.reducerPath]: getAllFinanceApi.reducer,
        [postSalaryApi.reducerPath]: postSalaryApi.reducer,
        [postFinanceApi.reducerPath]: postFinanceApi.reducer,
        [deleteFinanceApi.reducerPath]: deleteFinanceApi.reducer,
        [getFinanceUpdateApi.reducerPath]: getFinanceUpdateApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                    .concat(getAllFinanceApi.middleware)
                    .concat(postSalaryApi.middleware)
                    .concat(postFinanceApi.middleware)
                    .concat(deleteFinanceApi.middleware)
                    .concat(getFinanceUpdateApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)