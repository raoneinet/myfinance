import { useState, useEffect } from "react"
import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import { InsertExpense } from "./insertExpense"
import { SearchExpense } from "./searchFinance"
import { FinanceType } from "@/app/types/financeTypes"
import { BtnType } from "@/app/types/btnType"
import { dateTime } from "@/app/utils/formatDate"
import { getAllFinanceApi } from "@/redux/reducers/allFinance"
import { store } from '../../redux/store';


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

    //const {data} = useGetAllFinanceQuery()
    //console.log("VALORES RTK: ",data)

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
            const salaryPromise = store.dispatch(getAllFinanceApi.endpoints.getSalary.initiate({month, year}))

            const newSalary = await salaryPromise

            setSalary(Number(newSalary.data.salary_amount))
            console.log("Este é o nooovo salario: ", newSalary.data.salary_amount)
            //const newSalary = await requestSalary({ month, year, setSalary })

            console.log("SALÁRIO QUE PEGUEI:", newSalary)

            // Return the actual salary value so it can be used immediately
            return newSalary.data.salary_amount ?? 0
        } catch (error: any) {
            console.log("Erro ao buscar sálario: ", error)
            return 0
        }
    }

    //Get sum of all salaries (for unfiltered view)
    const getSalarySum = async () => {
        try {
            const salarySumPromise = store.dispatch(getAllFinanceApi.endpoints.getSalarySum.initiate())

            const salarySum = await salarySumPromise

            setSalary(salarySum.data.total_salaries)

            return salarySum.data.total_salaries || 0
            
        } catch (error: any) {
            console.log("Erro ao buscar soma dos salários:", error)
            return 0
        }
    }

    //Gets all finance with no filter
    const getFinance = async () => {
        try {
            // Clear month/year filter
            setCurrentMonth(null)
            setCurrentYear(null)

            store.dispatch(getAllFinanceApi.endpoints.getAllFinance.initiate())
                .then((response)=>{
                    setFinance(response.data.finance)
                })

            const totalSalaries = await getSalarySum()
            console.log("Total de todos os salários:", totalSalaries)

            // Get totals without month filter - uses all-time data with total salaries
            await getTotals(totalSalaries)

        } catch (error: any) {
            console.log("Erro ao buscar por finanças: ", error)
        }
    }

    //Get the total sum for income, salary, expense and balance
    const getTotals = async (salaryValue?: number): Promise<void> => {
        try {
            // Use provided salary or fallback to state
            const currentSalary = salaryValue ?? salary

            await store.dispatch(getAllFinanceApi.endpoints.getTotalFinanceValues.initiate())
                    .then((response: any) =>{
                        const extra_income = Number(response.data.extra_income)
                        const total_geral = Number(response.data.total_geral)

                        const balanceMath = (extra_income + currentSalary) - total_geral

                        setExtraIncomeTotal(extra_income)
                        setExpenseTotals(total_geral)
                        setExpenseBalance(balanceMath)
                    })

            console.log("ESTE É O SALARIO EM TOTALS", currentSalary)
        } catch (error: any) {
            console.log("Erro ao buscar os totais: ", error)
        }
    }

    //Gets finance by month and year
    const getFinancePerMonth = async ({ month, year, salary: salaryParam }: any) => {
        try {
            if(!month || !year) return

            await store.dispatch(getAllFinanceApi.endpoints.getFilteredFinanceByMonth.initiate({month, year}))
                    .then(response => {
                        console.log("VALORES FILTRADOS POR MêS: ", response.data)
                        setFinance(response.data)
                    }).catch(error =>{
                        setFinance([])
                        return
                    })

            // Set current filter
            setCurrentMonth(month)
            setCurrentYear(year)

            // Get finance data for the specific month
            //await requestFinanceByMonth({ month, year, setFinance })

            // Get or use salary
            let currentSalary = salaryParam
            if (currentSalary === undefined || currentSalary === null) {
                currentSalary = await getSalary(month, year)
            }

            // Get totals ONLY for this specific month
            await getTotalsByMonth({ month, year, salary: currentSalary })

        } catch (error: any) {
            console.log("Erro ao buscar movimentos: ", error)
        }
    }

    //Get total values by month
    const getTotalsByMonth = async ({ month, year, salary: salaryParam }: any) => {
        try {
            const currentSalary = salaryParam ?? salary

           const totalFinanceValue = await store.dispatch(
                                    getAllFinanceApi.endpoints.getFilteredTotalValuesByMonth.initiate({month, year})
                                )
            const total_expense = Number(totalFinanceValue.data.total_geral ?? 0)
            const extra_income = Number(totalFinanceValue.data.extra_income)

            setExpenseTotals(total_expense)
            setExtraIncomeTotal(extra_income)
            
            const balanceMath = (extra_income + currentSalary) - total_expense
            setExpenseBalance(balanceMath)

            console.log("VALORES FILTRADOS POR MÊS EM RTK",totalFinanceValue.data)
            console.log(`Buscando totais para ${month}/${year} com salário: ${currentSalary}`)
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
        }

        // Otherwise refresh with current date
        getDateTime()
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
                    currentMonth={currentMonth}
                    currentYear={currentYear}
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
                    handleUpdateAll={handleUpdateAll}
                    getFinancePerMonth={getFinancePerMonth}
                />
            </div>
        </>
    )
}