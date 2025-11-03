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
    useGetSalarySumQuery,
    useGetTotalFinanceValuesQuery,
    useGetSalaryQuery,
    useGetFilteredFinanceByMonthQuery,
    useGetFilteredTotalValuesByMonthQuery,
    useGetYearListQuery,
} from "@/redux/reducers/getFinanceQuery"
import { current } from "@reduxjs/toolkit"

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
    const [uniqueYearList, setUniqueYearList] = useState<any>()

    const [ getAllFinance, {data: allFinance}]  = useLazyGetAllFinanceQuery()
    const { data: salarySum } = useGetSalarySumQuery()
    const { data: totalValuesSum } = useGetTotalFinanceValuesQuery()
    const { data: yearList } = useGetYearListQuery()
    const { data: filteredFinance } = useGetFilteredFinanceByMonthQuery(
        { month: currentMonth, year: currentYear },
        { skip: !currentMonth || !currentYear }
    )
    const { data: filterTotalValues } = useGetFilteredTotalValuesByMonthQuery(
        { month: currentMonth, year: currentYear },
        { skip: !currentMonth || !currentYear }
    )
    const { data: filteredSalary, refetch: refetchSalary } = useGetSalaryQuery(
        { month: currentMonth, year: currentYear },
        { skip: !currentMonth || !currentYear }
    )

    console.log(filterTotalValues)

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
    }

    //Get salary according to current month
    const getSalary = (month: number, year: number) => {
        try {

        } catch (error: any) {
            console.log("Erro ao buscar sálario: ", error)
            return 0
        }
    }

    //Get sum of all salaries (for unfiltered view)
    const getSalarySum = () => {
        try {
            const { total_salaries } = salarySum

            if (total_salaries !== isNaN) {
                setSalary(total_salaries)
            } else {
                setSalary(Number(total_salaries))
            }

        } catch (error: any) {
            console.log("Erro ao buscar soma dos salários:", error)
            return 0
        }
    }

    //Gets all finance with no filter
    const requestAllFinance = async () => {
        try {
            const result = await getAllFinance().unwrap()

            const {finance: allfinanceTransactions } = result

            if(allfinanceTransactions !== 0){
                setFinance(allfinanceTransactions)
            }else{
                setFinance([])
            }
            
            console.log("AQUIIII ALL FINANCE", allfinanceTransactions)

            getTotals()
            getSalarySum()
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

            if (filteredFinance && Array.isArray(filteredFinance) && filteredFinance.length > 0) {
                setFinance(filteredFinance)
            } else if (filteredFinance?.finance && Array.isArray(filteredFinance.finance)) {
                setFinance(filteredFinance?.finance)
            } else {
                setFinance([])
            }

            setCurrentMonth(month)
            setCurrentYear(year)
            console.log("Mês que recebi ", month, "ano que recebi ", year)

            //setFinance(filteredFinance)
        } catch (error: any) {
            console.log("Erro ao buscar movimentos: ", error)
        }
    }

    //Get total values by month
    const getTotalsByMonth = ({ month, year, salary: salaryParam }: any) => {
        try {

        } catch (error: any) {
            console.log("Erro ao buscar totais: ", error)
        }
    }

    const getUniqueYear = () => {
        try {
            setUniqueYearList(yearList)

            console.log("Lista de anos: ", yearList)

        } catch (error: any) {
            console.log("Erro ao buscar pela lista de anos em banco de dados. ", error)
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
    }, [filteredFinance])

    useEffect(() => {
        getFilterFinance()
    }, [])

    useEffect(() => {
        if (yearList) {
            setUniqueYearList(yearList)

            const listingYear = yearList.map((item: any) => {
                return new Date(item.transaction_date).getFullYear()
            })

            const uniqueYears: any[] = Array.from(new Set(listingYear)).sort((a: any, b: any) => b - a)

            setUniqueYearList(uniqueYears)
        }
    }, [yearList])

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
                    getSalary={getSalary}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    uniqueYearList={uniqueYearList}
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