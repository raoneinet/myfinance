"use client"
import { useState, useEffect } from "react"
import api from "@/app/api/api"
import { FinanceType } from "@/types/financeTypes"
import { FinanceTable } from "@/components/financeTable"

type Props = {
    finance: FinanceType[]
    getFinance: ()=>void
}

export const ExpenseTable = ({finance, getFinance}: Props) => {

    useEffect(() => {
        getFinance()
    }, [])

    return (
        <div className="px-5 py-5 w-full">
            <FinanceTable
                finance={finance}
            />
        </div>
    )
}