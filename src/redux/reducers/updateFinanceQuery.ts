import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const getFinanceUpdateApi = createApi({
    reducerPath: "getFinanceUpdateApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/myfinance_backend/api",
        credentials: "include"
    }),
    endpoints: (builder)=>({
        getFinanceUpdate: builder.query<any, any>({
            query: (id)=> `/single_finance.php?id=${id}`
        }),
        postFinanceUpdate: builder.mutation<any, any>({
            query: ({data})=>({
                url: `/edit_finance.php`,
                method: "post",
                body: data
            })
        })
    })
})


export const {useGetFinanceUpdateQuery} = getFinanceUpdateApi