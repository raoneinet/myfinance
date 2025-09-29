import { useState, useEffect } from "react"
import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import { InsertExpense } from "./insertExpense"
import { SearchExpense } from "./searchFinance"
import { FinanceType } from "@/types/financeTypes"
import { BtnType } from "./btnType"
import api from "@/app/api/api"
import { SalaryTypes } from "@/types/salaryTypes"


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
    const getSalary = async (month?: number, year?: number) => {
        try {
            const res = await api.get(`/get_salary.php?month=${month}&year=${year}`)

            const actual_salary = Number(res.data.salary_amount)

            setSalary(actual_salary)
            console.log("Salario atual: ", actual_salary)
        } catch (error: any) {
            console.log("Erro ao buscar sálario: ", error)
        }
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

            const total_expense = Number(totalFinance.data.total_geral)
            const extra_income = Number(totalFinance.data.extra_income)

            setExpenseTotals(total_expense)
            setExtraIncomeTotal(extra_income)

            if (!isNaN(total_expense) && !isNaN(extra_income)) {
                const expenseMath = (extra_income + salary) - total_expense
                setExpenseBalance(expenseMath)
            }

        } catch (error: any) {
            console.log("Erro ao buscar os totais: ", error)
        }
    }

    //formats date for filtering
    const getDateTime = async () => {
        const getDate = new Date()
        const selDay = getDate.getDate()
        const month = getDate.getMonth() + 1
        const year = getDate.getFullYear()
        console.log(`Data escolhida: ${selDay > 9 ? selDay : "0" + selDay}, 
                                    ${month > 9 ? month : "0" + month}, ${year}`)

        await getSalary(month, year)
        await getFinancePerMonth({ month, year })
    }

    //Gets finance by month and year
    const getFinancePerMonth = async ({ month, year }: any) => {
        try {
            if (!month && !year) return console.log("Obrigatório passar Mês e Ano")

            const res = await api.get(`/finance_month.php?month=${month}&year=${year}`)

            if (res.status !== 200) return console.log("Erro ao buscar movimentos")

            setFinance(res.data)
            getTotalsByMonth({ month, year })
        } catch (error: any) {
            console.log("Erro ao buscar movimentos: ", error)
        }
    }

    //Get total values by month
    const getTotalsByMonth = async ({ month, year }: any) => {
        try {
            if (!month && !year) return console.log("Obrigatório passar Mês e Ano")

            const totalFinance = await api.get(`/totals_month.php?month=${month}&year=${year}`)

            const total_expense = Number(totalFinance.data.total_geral)
            const extra_income = Number(totalFinance.data.extra_income)
            const salaryValue = salary ?? console.log("Erro no salario")

            setExpenseTotals(total_expense)
            setExtraIncomeTotal(extra_income)

            if (!isNaN(total_expense) && !isNaN(extra_income) && !isNaN(salary)) {
                const balance = (extra_income + salaryValue) - total_expense
                setExpenseBalance(balance)
            }

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
