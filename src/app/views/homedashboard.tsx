import { useState, useEffect } from "react"
import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import { InsertExpense } from "./insertExpense"
import { SearchExpense } from "./searchFinance"
import { FinanceType } from "@/app/types/financeTypes"
import { BtnType } from "@/app/types/btnType"
import { dateTime } from "@/app/utils/formatDate"
import {
    useGetAllFinanceQuery,
    useGetSalarySumQuery,
    useGetTotalFinanceValuesQuery,
    useGetSalaryQuery,
    useGetFilteredFinanceByMonthQuery,
    useGetFilteredTotalValuesByMonthQuery,
    useGetYearListQuery,
} from "@/redux/reducers/getFinanceQuery"

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

    const {data: allFinance, error, isLoading} = useGetAllFinanceQuery()

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

    }

    //Get salary according to current month
    const getSalary = async (month: number, year: number) => {
        try {

        } catch (error: any) {
            console.log("Erro ao buscar sálario: ", error)
            return 0
        }
    }

    //Get sum of all salaries (for unfiltered view)
    const getSalarySum = async () => {
        try {


        } catch (error: any) {
            console.log("Erro ao buscar soma dos salários:", error)
            return 0
        }
    }

    //Gets all finance with no filter
    const getAllFinance = () => {
        try {
            const {finance} = allFinance

            setFinance(finance || [])

            console.log(finance)

        } catch (error: any) {
            console.log("Erro ao buscar por finanças: ", error)
        }
    }

    //Get the total sum for income, salary, expense and balance
    const getTotals = async (salaryValue?: number): Promise<void> => {
        try {

        } catch (error: any) {
            console.log("Erro ao buscar os totais: ", error)
        }
    }

    //Gets finance by month and year
    const getFinancePerMonth = async ({ month, year, salary: salaryParam }: any) => {
        try {

        } catch (error: any) {
            console.log("Erro ao buscar movimentos: ", error)
        }
    }

    //Get total values by month
    const getTotalsByMonth = async ({ month, year, salary: salaryParam }: any) => {
        try {

        } catch (error: any) {
            console.log("Erro ao buscar totais: ", error)
        }
    }

    const getUniqueYear = async (setSelectYear: (arg: any) => void): Promise<void> => {
        try {

        } catch (error: any) {
            console.log("Erro ao buscar pela lista de anos em banco de dados. ", error)
        }
    }

    useEffect(() => {
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
                    getAllFinance={getAllFinance}
                    getFinancePerMonth={getFinancePerMonth}
                    getCurrent={getDateTime}
                    getSalary={getSalary}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    getUniqueYear={getUniqueYear}
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