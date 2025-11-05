import { useState, useEffect } from "react"
import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import { InsertExpense } from "./insertExpense"
import { SearchExpense } from "./searchFinance"
import { FinanceType } from "@/app/types/financeTypes"
import { BtnType } from "@/app/types/btnType"
import { dateTime } from "@/app/utils/formatDate"
import {
    useLazyGetAllFinanceQuery,
    useLazyGetSalarySumQuery,
    useGetTotalFinanceValuesQuery,
    useLazyGetSalaryQuery,
    useLazyGetFilteredFinanceByMonthQuery,
    useLazyGetFilteredTotalValuesByMonthQuery,
} from "@/redux/reducers/getFinanceQuery"

export const HomeDashboard = () => {

    const [showModal, setShowModal] = useState(false)
    const [clickedBtn, setClickedBtn] = useState<BtnType>()
    const [finance, setFinance] = useState<FinanceType[]>([]);
    const [expenseTotals, setExpenseTotals] = useState<number>(0)
    const [extraIncomeTotal, setExtraIncomeTotal] = useState<number>(0)
    const [expenseBalance, setExpenseBalance] = useState<number>(0)
    const [salary, setSalary] = useState<number>(0)
    const [currentMonth, setCurrentMonth] = useState<number>(0)
    const [currentYear, setCurrentYear] = useState<number>(0)


    const [getAllFinance, { data: allFinance }] = useLazyGetAllFinanceQuery()
    const [getSalarySum, { data: salarySum }] = useLazyGetSalarySumQuery()
    const { data: totalValuesSum } = useGetTotalFinanceValuesQuery()
    const [ getFilteredFinanceByMonth, {data: filteredFinance}] = useLazyGetFilteredFinanceByMonthQuery()
    const [getFilteredTotalValuesByMonth, { data: filterTotalValues }] = useLazyGetFilteredTotalValuesByMonthQuery()
    const [ getSalary, {data: filteredSalary}] = useLazyGetSalaryQuery()

    console.log("VALORESS TESTESSS", filteredFinance)

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
    const getFilterFinance = () => {
        const { day, month, year } = dateTime()

        if (!month && !year) return
        setCurrentMonth(month)
        setCurrentYear(year)
        getFinancePerMonth({ month, year })
        requestSalary(month, year)
        getTotalsByMonth({ month, year })
    }

    //Get salary according to current month
    const requestSalary = async (month: number, year: number) => {
        try {
            const salaryMonth = await getSalary({month, year})

            if (salaryMonth.data.salary_amount !== isNaN && salaryMonth.data.salary_amount > 0) {
                setSalary(salaryMonth.data.salary_amount)
            } else if (salaryMonth.data.salary_amount === isNaN) {
                setSalary(Number(salaryMonth.data.salary_amount))
            } else {
                setSalary(0)
            }


        } catch (error: any) {
            console.log("Erro ao buscar sálario: ", error)
            return 0
        }
    }

    //Get sum of all salaries (for unfiltered view)
    const requestSalarySum = async () => {
        try {
            const result = await getSalarySum().unwrap()

            const { total_salaries } = result

            if (total_salaries !== isNaN) {
                setSalary(total_salaries)
            } else {
                setSalary(Number(total_salaries))
            }

            console.log("SALRIOOOO", total_salaries)

        } catch (error: any) {
            console.log("Erro ao buscar soma dos salários:", error)
            return 0
        }
    }

    //Gets all finance with no filter
    const requestAllFinance = async () => {
        try {
            const result = await getAllFinance().unwrap()

            const { finance: allfinanceTransactions } = result

            if (allfinanceTransactions !== 0) {
                setFinance(allfinanceTransactions)
            } else {
                setFinance([])
            }

            console.log("AQUIIII ALL FINANCE", allfinanceTransactions)

            await getTotals()
            await requestSalarySum()
        } catch (error: any) {
            console.log("Erro ao buscar por finanças: ", error)
        }
    }

    //Get the total sum for income, salary, expense and balance
    const getTotals = () => {
        try {
            const { total_geral, extra_income } = totalValuesSum

            let totalGeral = Number(total_geral ?? 0)
            let extraIncome = Number(extra_income ?? 0)
            let totalSalary = Number(salary ?? 0)

            setExpenseTotals(totalGeral)
            setExtraIncomeTotal(extraIncome)
            setExpenseBalance((totalSalary + extraIncome) - totalGeral)

        } catch (error: any) {
            console.log("Erro ao buscar os totais: ", error)
        }
    }

    //Gets finance by month and year
    const getFinancePerMonth = async ({ month, year }: { month: number, year: number }) => {
        try {
            if (!month && !year) {
                console.log("Não foi filtrado nenhum mês!")
            }

            const filterFinanceMonth = await getFilteredFinanceByMonth({month, year})

            if(filterFinanceMonth.data.length > 0){
                setFinance(filterFinanceMonth.data)
            }else{
                setFinance([])
            }

            setCurrentMonth(Number(month))
            setCurrentYear(Number(year))
            console.log("Mês que recebi ", month, "ano que recebi ", year)
            console.log("VALORES FILTRADOS POR MÊS: ", filterFinanceMonth)

            //setFinance(filteredFinance)
        } catch (error: any) {
            console.log("Erro ao buscar movimentos: ", error)
        }
    }

    //Get total values by month
    const getTotalsByMonth = async ({ month, year, salary: salaryParam }: any) => {
        try {
            const totalsByMonth = await getFilteredTotalValuesByMonth({ month, year })

            if (totalsByMonth) {
                const totalGeral = Number(totalsByMonth.data.total_geral ?? 0)
                const extraIncome = Number(totalsByMonth.data.extra_income ?? 0)

                setExpenseTotals(totalGeral)
                setExtraIncomeTotal(extraIncome)
                setExpenseBalance((salary + extraIncome) - totalGeral)
            }

            console.log("TOTAIS POR MÊS", totalsByMonth)

        } catch (error: any) {
            console.log("Erro ao buscar totais: ", error)
        }
    }

    useEffect(() => {
        if (filterTotalValues) {
            const totalGeral = Number(filterTotalValues.total_geral ?? 0)
            const extraIncome = Number(filterTotalValues.extra_income ?? 0)
            const totalSalary = Number(filteredSalary?.salary ?? salary ?? 0)

            setExpenseTotals(totalGeral)
            setExtraIncomeTotal(extraIncome)
            setExpenseBalance((totalSalary + extraIncome) - totalGeral)
        }

    }, [filterTotalValues, filteredSalary])

    useEffect(() => {
        getFilterFinance()
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
                    requestAllFinance={requestAllFinance}
                    getFinancePerMonth={getFinancePerMonth}
                    getCurrentFinance={getFilterFinance}
                    getSalary={requestSalary}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                />
                {showModal &&
                    <InsertExpense
                        closeModal={handleCloseModal}
                        getTotals={getTotals}
                        getFinancePerMonth={getFinancePerMonth}
                        clickedBtn={clickedBtn}
                    />
                }
                <ExpenseTable
                    finance={finance}
                    getFinancePerMonth={getFinancePerMonth}
                />
            </div>
        </>
    )
}