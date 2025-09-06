"use client"
import { useState, useEffect } from "react"
import api from "@/app/api/api"
import { FinanceType } from "@/types/financeTypes"
import { FinanceTable } from "@/components/financeTable"
export const ExpenseTable = () => {

    const [finance, setFinance] = useState<FinanceType[]>([]);

    useEffect(() => {
        const getFinance = async () => {
            try {
                const res = await api.get("/finance.php")
                console.log("Finanças: ", res)

                if (res.status !== 200) throw new Error("Erro ao buscar finanças")

                const data = res.data.finance

                setFinance(data)
            } catch (error: any) {
                console.log("Erro ao buscar por finanças: ", error)
            }
        }

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