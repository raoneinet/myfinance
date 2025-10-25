import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const getAllFinanceApi = createApi({
    reducerPath: "getAllFinanceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/myfinance_backend/api",
        credentials: "include"
    }),
    endpoints: (builder)=>({
        getAllFinance: builder.query<any, void>({
            query: ()=> "/finance.php"
        }),
        getSalarySum: builder.query<any, void>({
            query: ()=> "/get_totals_salary.php"
        }),
        getTotalFinanceValues: builder.query<any, void>({
            query: ()=> "/get_totals.php"
        }),
        getSalary: builder.query<any, {month: number, year: number}>({
            query: ({month, year})=> `/get_salary.php?month=${month}&year=${year}`
        }),
        getFilteredFinanceByMonth: builder.query<any, {month:number, year:number}>({
            query: ({month, year})=> `/finance_month.php?month=${month}&year=${year}`
        }),
        getFilteredTotalValuesByMonth: builder.query<any, {month: number, year: number}>({
            query: ({month, year})=> `/totals_month.php?month=${month}&year=${year}`
        })

    })
})

export const {useGetAllFinanceQuery} = getAllFinanceApi