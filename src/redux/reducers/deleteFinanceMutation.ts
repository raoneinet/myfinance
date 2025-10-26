import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const deleteFinanceApi = createApi({
    reducerPath: "deleteFinanceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/myfinance_backend/api",
        credentials: "include"
    }),
    endpoints: (builder)=>({
        deleteFinance: builder.mutation<any, any>({
            query: (id)=>({
                url: "/delete_finance_item.php",
                method: "post",
                body: {id}
            })
        })
    })
})

export const {useDeleteFinanceMutation} = deleteFinanceApi