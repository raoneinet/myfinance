import { useState, useEffect } from "react"
import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import { InsertExpense } from "./insertExpense"
import { SearchExpense } from "./searchFinance"
import { FinanceType } from "@/types/financeTypes"
import { BtnType } from "../types/btnType"
import { dateTime } from "@/utils/formatDate"
import {
    requestSalary, requestFinance, requestTotalValues,
    requestFinanceByMonth, requestTotalValuesByMonth, requestSalarySum
} from "@/services/finance"


export const HomeDashboard = () => {

    const [showModal, setShowModal] = useState(false)
    const [clickedBtn, setClickedBtn] = useState<BtnType>()
    const [finance, setFinance] = useState<FinanceType[]>([]);
    const [expenseTotals, setExpenseTotals] = useState<number>(0)
    const [extraIncomeTotal, setExtraIncomeTotal] = useState<number>(0)
    const [expenseBalance, setExpenseBalance] = useState<number>(0)
    const [salary, setSalary] = useState<number>(0)
    const [currentMonth, setCurrentMonth] = useState<number | null>(null)
    const [currentYear, setCurrentYear] = useState<number | null>(null)

    const handleShowModal = (button: any) => {
        setClickedBtn(button)
        setShowModal(true)
        console.log("BOTÃO CLICADO: ", button)
    }

    const handleCloseModal = () => {
        setClickedBtn(null)
        setShowModal(false)
    }

    const getDateTime = async () => {
        const filterDate = dateTime()

        setCurrentMonth(filterDate.month)
        setCurrentYear(filterDate.year)
        const currentSalary = await getSalary(filterDate.month, filterDate.year)

        await getFinancePerMonth({
            month: filterDate.month,
            year: filterDate.year,
            salary: currentSalary
        })
    }

    const getSalary = async (month: number, year: number): Promise<number> => {
        try {
            const newSalary = await requestSalary({ month, year, setSalary })

            console.log("SALÁRIO QUE PEGUEI:", newSalary)

            return newSalary ?? 0
        } catch (error: any) {
            console.log("Erro ao buscar sálario: ", error)
            return 0
        }
    }

    const getSalarySum = async (): Promise<number> => {
        try {
            const salarySum = await requestSalarySum(setSalary)

            console.log("SOMA DOS SALÁRIOS QUE PEGUEI:", salarySum)

            return salarySum ?? 0
        } catch (error: any) {
            console.log("Erro ao buscar soma dos salários:", error)
            return 0
        }
    }

    const getFinance = async () => {
        try {
            setCurrentMonth(null)
            setCurrentYear(null)

            await requestFinance({ setFinance })

            const totalSalaries = await requestSalarySum(setSalary)
            console.log("Total de todos os salários:", totalSalaries)

            await getTotals(totalSalaries)
        } catch (error: any) {
            console.log("Erro ao buscar por finanças: ", error)
        }
    }

    const getTotals = async (salaryValue?: number) => {
        try {
            const currentSalary = salaryValue ?? salary

            await requestTotalValues(
                {
                    setExpenseTotals,
                    setExtraIncomeTotal,
                    setExpenseBalance,
                    salary: currentSalary
                }
            )
            console.log("ESTE É O SALARIO EM TOTALS", currentSalary)
        } catch (error: any) {
            console.log("Erro ao buscar os totais: ", error)
        }
    }

    const getFinancePerMonth = async ({ month, year, salary: salaryParam }: any) => {
        try {
            setCurrentMonth(month)
            setCurrentYear(year)

            await requestFinanceByMonth({ month, year, setFinance })

            let currentSalary = salaryParam
            if (currentSalary === undefined || currentSalary === null) {
                currentSalary = await getSalary(month, year)
            }

            await getTotalsByMonth({ month, year, salary: currentSalary })
        } catch (error: any) {
            console.log("Erro ao buscar movimentos: ", error)
        }
    }

    const getTotalsByMonth = async ({ month, year, salary: salaryParam }: any) => {
        try {
            const currentSalary = salaryParam ?? salary

            console.log(`Buscando totais para ${month}/${year} com salário: ${currentSalary}`)

            await requestTotalValuesByMonth(
                {
                    month,
                    year,
                    salary: currentSalary,
                    setExpenseTotals,
                    setExtraIncomeTotal,
                    setExpenseBalance
                }
            )
        } catch (error: any) {
            console.log("Erro ao buscar totais: ", error)
        }
    }

    const handleUpdateAll = () => {
        if (currentMonth !== null && currentYear !== null) {
            getFinancePerMonth({
                month: currentMonth,
                year: currentYear
            })
        } else {
            getDateTime()
        }
    }

    useEffect(() => {
        getDateTime()
    }, [])

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
                    getCurrent={getDateTime}
                    getSalary={getSalary}
                />
                {showModal &&
                    <InsertExpense
                        closeModal={handleCloseModal}
                        updateDashboard={handleUpdateAll}
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