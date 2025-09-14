"use client"
import { useEffect } from "react"
import { FinanceType } from "@/types/financeTypes"
import { FinanceTable } from "@/components/financeTable"
import {FinanceCalendar} from "@/components/financeCalendar"

type Props = {
    finance: FinanceType[]
    getFinance: ()=>void
    handleUpdateAll: ()=>void
}

export const ExpenseTable = ({finance, getFinance, handleUpdateAll}: Props) => {

    useEffect(() => {
        getFinance()
    }, [])

    return (
        <div className="px-5 py-5 max-h-5/6 flex gap-3 lg:flex-row flex-col">
            <FinanceTable
                finance={finance}
                handleUpdateAll={handleUpdateAll}
            />

            <FinanceCalendar/>
        </div>
    )
}