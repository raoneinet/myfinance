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
    const [currentMonth, setCurrentMonth] = useState<number | null>(null)
    const [currentYear, setCurrentYear] = useState<number | null>(null)

    //Get the clicked button to open right modal (add salary or transaction)
    const handleShowModal = (button: any) => {
        setClickedBtn(button)
        setShowModal(true)
        console.log("BOTÃO CLICADO: ", button)
    }

    //close modal
    const handleCloseModal = () => {
        setClickedBtn(null)
        setShowModal(false)
    }

    //formats date for filtering
    const getDateTime = async () => {
        const filterDate = dateTime()

        setCurrentMonth(filterDate.month)
        setCurrentYear(filterDate.year)

        // Get salary first and wait for the actual value
        const currentSalary = await getSalary(filterDate.month, filterDate.year)
        
        // Pass the returned salary value instead of relying on state
        await getFinancePerMonth({
            month: filterDate.month,
            year: filterDate.year,
            salary: currentSalary
        })
    }

    //Get salary according to current month
    const getSalary = async (month: number, year: number): Promise<number> => {
        try {
            const newSalary = await requestSalary({ month, year, setSalary })

            console.log("SALÁRIO QUE PEGUEI:", newSalary)
            
            // Return the actual salary value so it can be used immediately
            return newSalary ?? 0
        } catch (error: any) {
            console.log("Erro ao buscar sálario: ", error)
            return 0
        }
    }

    //Gets all finance with no filter
    const getFinance = async () => {
        try {
            // Clear month/year filter
            setCurrentMonth(null)
            setCurrentYear(null)
            
            await requestFinance({setFinance})
            
            // For unfiltered view, we need to get salary for current month
            const filterDate = dateTime()
            const currentSalary = await getSalary(filterDate.month, filterDate.year)
            
            // Get totals without month filter - uses all-time data
            await getTotals(currentSalary)
        } catch (error: any) {
            console.log("Erro ao buscar por finanças: ", error)
        }
    }

    //Get the total sum for income, salary, expense and balance
    const getTotals = async (salaryValue?: number) => {
        try {
            // Use provided salary or fallback to state
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

    //Gets finance by month and year
    const getFinancePerMonth = async ({ month, year, salary: salaryParam }: any) => {
        try {
            // Set current filter
            setCurrentMonth(month)
            setCurrentYear(year)
            
            // Get finance data for the specific month
            await requestFinanceByMonth({month, year, setFinance})
            
            // Get or use salary
            let currentSalary = salaryParam
            if (currentSalary === undefined || currentSalary === null) {
                currentSalary = await getSalary(month, year)
            }
            
            // Get totals ONLY for this specific month
            await getTotalsByMonth({month, year, salary: currentSalary})

        } catch (error: any) {
            console.log("Erro ao buscar movimentos: ", error)
        }
    }

    //Get total values by month
    const getTotalsByMonth = async ({ month, year, salary: salaryParam }: any) => {
        try {
            // Use the salary parameter that was passed in
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

    //Updates all transactions
    const handleUpdateAll = () => {
        // If there's a current filter, refresh with that filter
        if (currentMonth !== null && currentYear !== null) {
            getFinancePerMonth({ 
                month: currentMonth, 
                year: currentYear 
            })
        } else {
            // Otherwise refresh with current date
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