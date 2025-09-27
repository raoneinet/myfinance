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

    //Gets all finance with no filter
    const getFinance = async () => {
        try {
            const res = await api.get("/finance.php")
            console.log("Finanças: ", res)

            if (res.status !== 200) throw new Error("Erro ao buscar finanças")

            const data = res.data.finance
            console.log(data)

            setFinance(data)
        } catch (error: any) {
            console.log("Erro ao buscar por finanças: ", error)
        }
        getTotals()
    }

    //Get the total sum for income, salary, expense and balance
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

    //formats date for filtering
    const getDateTime = () => {
        const getDate = new Date()
        const selDay = getDate.getDate()
        const month = getDate.getMonth() + 1
        const year = getDate.getFullYear()
        console.log(`Data escolhida: ${selDay > 9 ? selDay : "0" + selDay}, ${month > 9 ? month : "0" + month}, ${year}`)
        getFinancePerMonth({ month, year })
    }

    //Gets finance by month and year
    const getFinancePerMonth = async ({ month, year }: any) => {
        try {
            if (!month && !year) return null

            const res = await api.get(`/finance_month.php?month=${month}&year=${year}`)

            if (res.status !== 200) return console.log("Erro ao buscar movimentos")
            setFinance(res.data)
            getTotalsByMonth({month, year})
        } catch (error: any) {
            console.log("Erro ao buscar movimentos: ", error)
        }
    }

    const getTotalsByMonth = async ({ month, year }: any) => {
        try {
            if (!month && !year) return console.log("Obrigatório passar Mês e Ano")

            const res = await api.get(`/totals_month.php?month=${month}&year=${year}`)

            setExpenseTotals(res.data.total_geral)
            setExtraIncomeTotal(res.data.extra_income)

            console.log("Totais: " + month + " / " + year)

        } catch (error: any) {
            console.log("Erro ao buscar totais: ", error)
        }
    }


    const getExpenseBalance = () => {
        //need to create rules
    }

    //Updates all transactions
    const handleUpdateAll = () => {
        //getTotals()
    }

    useEffect(() => {
        getDateTime()
        handleUpdateAll()
    }, [])

    return (
        <>
            <div className="container mx-auto">
                <TotalFinancing
                    expenseTotals={expenseTotals}
                    extraIncomeTotal={extraIncomeTotal}
                    expenseBalance={expenseBalance}
                />
                <SearchExpense
                    setModal={handleShowModal}
                    getFinance={getFinance}
                    getFinancePerMonth={getFinancePerMonth}

                />
                {showModal &&
                    <InsertExpense
                        closeModal={handleCloseModal}
                        updateDashboard={getFinance}
                        getTotals={getTotals}
                        getFinancePerMonth={getFinancePerMonth}
                    />
                }

                <ExpenseTable
                    finance={finance}
                    getFinance={getFinance}
                    handleUpdateAll={handleUpdateAll}
                />
            </div>
        </>
    )
}