import { useState, useEffect } from "react"
import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import { InsertExpense } from "./insertExpense"
import { SearchExpense } from "./searchFinance"
import { FinanceType } from "@/types/financeTypes"
import api from "@/app/api/api"

export const HomeDashboard = () => {

    const [showModal, setShowModal] = useState(false)
    const [finance, setFinance] = useState<FinanceType[]>([]);
    const [expenseTotals, setExpenseTotals] = useState()
    const [extraIncomeTotal, setExtraIncomeTotal] = useState()
    const [expenseBalance, setExpenseBalance] = useState<number>()

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

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

    const getTotals = async () => {
        try {
            const totalFinance = await api.get("/get_totals.php")

            setExpenseTotals(totalFinance.data.total_geral)
            setExtraIncomeTotal(totalFinance.data.extra_income)

            if (totalFinance.data.total_geral && totalFinance.data.extra_income) {
                const expenseMath = Number(totalFinance.data.extra_income) - Number(totalFinance.data.total_geral)
                setExpenseBalance(Number(expenseMath.toFixed(2)))
                console.log("Balanço: ", expenseMath.toFixed(2))
            }
            console.log("TOTAIS: ", totalFinance.data.total_geral)
            console.log("TOTAL Recebimento: ", totalFinance.data)

        } catch (error: any) {
            console.log("Erro ao buscar os totais: ", error)
        }
    }

    const getExpenseBalance = () => {


    }

    useEffect(() => {
        getFinance()
        getTotals()
        getExpenseBalance()
    }, [])

    return (
        <>
            <div className="container mx-auto h-full">
                <TotalFinancing
                    expenseTotals={expenseTotals}
                    extraIncomeTotal={extraIncomeTotal}
                    expenseBalance={expenseBalance}
                />
                <SearchExpense
                    setModal={handleShowModal}

                />
                {showModal &&
                    <InsertExpense
                        closeModal={handleCloseModal}
                        updateDashboard={getFinance}
                        getTotals={getTotals}
                    />
                }

                <ExpenseTable
                    finance={finance}
                    getFinance={getFinance}
                />
            </div>
        </>
    )
}