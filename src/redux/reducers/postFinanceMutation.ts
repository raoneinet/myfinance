import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { SendFinanceType } from "@/app/types/sendFinanceType"

export const postFinanceApi = createApi({
    reducerPath: "postFinanceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/myfinance_backend/api",
        credentials: "include"
    }),
    endpoints: (builder)=>({
        postFinance: builder.mutation<any, SendFinanceType>({
            query: (data)=> ({
                url: "/add_finance.php",
                method: "post",
                body: data
            })
        })
    })
})

export const {usePostFinanceMutation} = postFinanceApi