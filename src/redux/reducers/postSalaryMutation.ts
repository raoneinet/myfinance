import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SalaryTypes } from "@/app/types/salaryTypes";

export const postSalaryApi = createApi({
    reducerPath: "postSalaryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/myfinance_backend/api",
        credentials: "include"
    }),
    endpoints: (builder)=>({
        postSalary: builder.mutation<any, SalaryTypes>({
            query: (data)=>({
                url: "/add_salary.php",
                method: "post",
                body: data
            })
        })
    })
})

export const {usePostSalaryMutation} = postSalaryApi