"use client"
import { useEffect } from "react"
import { FinanceType } from "@/types/financeTypes"
import { FinanceTable } from "@/components/financeTable"
import { DataTable } from "@/components/table"
import { columns } from "@/utils/tableHead"

type Props = {
    finance: FinanceType[]
    getFinance: () => void
    handleUpdateAll: () => void
}

export const ExpenseTable = ({ finance, getFinance, handleUpdateAll }: Props) => {
    // <FinanceTable
    //     finance={finance}
    //     handleUpdateAll={handleUpdateAll}
    // />

    return (
        <div className="px-5 py-5 flex gap-3 flex-col">
            <DataTable columns={columns} data={finance} />
        </div>
    )
}