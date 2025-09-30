import { useState, useEffect } from "react"
import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import { InsertExpense } from "./insertExpense"
import { SearchExpense } from "./searchFinance"
import { FinanceType } from "@/types/financeTypes"
import { BtnType } from "./btnType"
import { dateTime } from "@/utils/formatDate"
import {
    requestSalary, requestFinance, requestTotalValues,
    requestFinanceByMonth, requestTotalValuesByMonth
} from "@/services/finance"


export const HomeDashboard = () => {

    const [showModal, setShowModal] = useState(false)
    const [clickedBtn, setClickedBtn] = useState<BtnType>()
    const [finance, setFinance] = useState<FinanceType[]>([]);
    const [expenseTotals, setExpenseTotals] = useState<number>(0)
    const [extraIncomeTotal, setExtraIncomeTotal] = useState<number>(0)
    const [expenseBalance, setExpenseBalance] = useState<number>(0)
    const [salary, setSalary] = useState<number>(0)

    //Get the clicked button to open right modal (add salary or transaction)
    const handleShowModal = (button: any) => {
        //const btnName = event.target.name
        setClickedBtn(button)
        setShowModal(true)
        console.log("BOTÃO CLICADO: ", button)
    }

    //close modal
    const handleCloseModal = () => {
        setClickedBtn(null)
        setShowModal(false)
    }

    //Get salary according to current month
    const getSalary = (month?: number, year?: number) => {
        try {
            requestSalary({ month, year, setSalary })
        } catch (error: any) {
            console.log("Erro ao buscar sálario: ", error)
        }
    }

    //Gets all finance with no filter
    const getFinance = () => {
        try {
            requestFinance({ setFinance })
        } catch (error: any) {
            console.log("Erro ao buscar por finanças: ", error)
        }
        getTotals()
    }

    //Get the total sum for income, salary, expense and balance
    const getTotals = () => {
        try {
            requestTotalValues(
                {
                    setExpenseTotals,
                    setExtraIncomeTotal,
                    setExpenseBalance,
                    salary
                }
            )
        } catch (error: any) {
            console.log("Erro ao buscar os totais: ", error)
        }
    }

    //formats date for filtering
    const getDateTime = () => {
        const filterDate = dateTime()

        getSalary(filterDate.month, filterDate.year)
        getFinancePerMonth({
            month: filterDate.month,
            year: filterDate.year
        })
    }

    //Gets finance by month and year
    const getFinancePerMonth = async ({ month, year }: any) => {
        try {
            if (!month && !year) return console.log("Obrigatório passar Mês e Ano")

            requestFinanceByMonth(
                {
                    month, year, setFinance,
                    getTotalsByMonth
                }
            )
        } catch (error: any) {
            console.log("Erro ao buscar movimentos: ", error)
        }
    }

    //Get total values by month
    const getTotalsByMonth = async ({ month, year }: any) => {
        try {
            if (!month && !year) return console.log("Obrigatório passar Mês e Ano")

            requestTotalValuesByMonth(
                {
                    month, year, salary, setExpenseTotals,
                    setExtraIncomeTotal, setExpenseBalance
                }
            )
        } catch (error: any) {
            console.log("Erro ao buscar totais: ", error)
        }
    }

    //Updates all transactions
    const handleUpdateAll = () => {
        //getTotals()
        getDateTime()
    }

    useEffect(() => {
        handleUpdateAll()
    }, [salary])

    return (
        <>
            <div className="container mx-auto">
                <TotalFinancing
                    expenseTotals={expenseTotals}
                    extraIncomeTotal={extraIncomeTotal}
                    expenseBalance={expenseBalance}
                    salary={salary}
                />
                <SearchExpense
                    setModal={handleShowModal}
                    getFinance={getFinance}
                    getFinancePerMonth={getFinancePerMonth}
                />
                {showModal &&
                    <InsertExpense
                        closeModal={handleCloseModal}
                        updateDashboard={getDateTime}
                        getTotals={getTotals}
                        getFinancePerMonth={getFinancePerMonth}
                        clickedBtn={clickedBtn}
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
