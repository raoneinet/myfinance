import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { SendFinanceType } from "@/app/types/sendFinanceType"
import { SalaryTypes } from "@/app/types/salaryTypes"

export const getAllFinanceApi = createApi({
    reducerPath: "financeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/myfinance_backend/api",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getAllFinance: builder.query<any, void>({
            query: () => "/finance.php"
        }),
        getSalarySum: builder.query<any, void>({
            query: () => "/get_totals_salary.php"
        }),
        getTotalFinanceValues: builder.query<any, void>({
            query: () => "/get_totals.php"
        }),
        getSalary: builder.query<any, { month: number, year: number }>({
            query: ({ month, year }) => `/get_salary.php?month=${month}&year=${year}`
        }),
        getFilteredFinanceByMonth: builder.query<any, { month: any, year: any }>({
            query: ({ month, year }) => `/finance_month.php?month=${month}&year=${year}`
        }),
        getFilteredTotalValuesByMonth: builder.query<any, { month: number, year: number }>({
            query: ({ month, year }) => `/totals_month.php?month=${month}&year=${year}`
        }),
        getYearList: builder.query<any, void>({
            query: () => "get_year.php"
        }),
        postFinance: builder.mutation<any, SendFinanceType>({
            query: (data) => ({
                url: "/add_finance.php",
                method: "post",
                body: data
            })
        }),
        postSalary: builder.mutation<any, SalaryTypes>({
            query: (data) => ({
                url: "/add_salary.php",
                method: "post",
                body: data
            })
        }),
        getFinanceUpdate: builder.query<any, any>({
            query: (id) => `/single_finance.php?id=${id}`
        }),
        postFinanceUpdate: builder.mutation<any, any>({
            query: ({ data }) => ({
                url: `/edit_finance.php`,
                method: "post",
                body: data
            })
        }),
        deleteFinance: builder.mutation<any, any>({
            query: (id) => ({
                url: "/delete_finance_item.php",
                method: "post",
                body: { id }
            })
        })
    })
})

export const {
    useLazyGetAllFinanceQuery,
    useGetSalarySumQuery,
    useGetTotalFinanceValuesQuery,
    useGetSalaryQuery,
    useGetFilteredFinanceByMonthQuery,
    useGetFilteredTotalValuesByMonthQuery,
    useGetYearListQuery,
} = getAllFinanceApi