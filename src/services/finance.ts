import api from "@/app/api/api"
import {
    SalaryProps,
    TotalsProps,
    FinanceMonthType,
    TotalValuesMonthType
} from "@/types/financeServiceTypes"

//Request salary
export const requestSalary = async ({ month, year }: SalaryProps) => {
    try {
        const res = await api.get(`/get_salary.php?month=${month}&year=${year}`)

        const actual_salary = Number(res.data.salary_amount ?? 0)

        console.log("Salario atual: ", actual_salary)

        return actual_salary
        
    } catch (error: any) {
        console.log("Erro ao buscar sálario: ", error)
    }
}

//Request all transactions without filter
export const requestFinance = async () => {
    try {
        const res = await api.get("/finance.php")

        const data = res.data.finance
        console.log(data)

        return data
    } catch (error: any) {
        console.log("Erro ao buscar por finanças: ", error)
    }
}

//Request sums of Total values without filter
export const requestTotalValues = async (
    { setExpenseTotals, setExtraIncomeTotal, setExpenseBalance, salary }: TotalsProps) => {

    try {
        const totalFinance = await api.get("/get_totals.php")

        const total_expense = Number(totalFinance.data.total_geral ?? 0)
        const extra_income = Number(totalFinance.data.extra_income ?? 0)

        setExpenseTotals(total_expense)
        setExtraIncomeTotal(extra_income)

        const expenseMath = (extra_income + salary) - total_expense

        console.log("SALARIO EM SERVICES", salary)
        setExpenseBalance(expenseMath)

    } catch (error: any) {
        console.log("Erro ao buscar os totais: ", error)
    }
}

//Request transactions by filtered month and year
export const requestFinanceByMonth = async (
    { month, year, setFinance, getTotalsByMonth }: FinanceMonthType) => {

    try {
        const res = await api.get(`/finance_month.php?month=${month}&year=${year}`)

        if (res.status !== 200) return console.log("Erro ao buscar movimentos")

        setFinance(res.data)
        await getTotalsByMonth({ month, year })
    } catch (error: any) {
        console.log("Erro ao buscar movimentos: ", error)
    }
}

//Request total values filtered by month and year
export const requestTotalValuesByMonth = async (
    { month, year, salary, setExpenseTotals,
        setExtraIncomeTotal, setExpenseBalance }: TotalValuesMonthType) => {

    try {
        const totalFinance = await api.get(`/totals_month.php?month=${month}&year=${year}`)

        const total_expense = Number(totalFinance.data.total_geral)
        const extra_income = Number(totalFinance.data.extra_income)

        setExpenseTotals(total_expense)
        setExtraIncomeTotal(extra_income)

        const balance = (extra_income + salary) - total_expense
        setExpenseBalance(balance)

    } catch (error: any) {
        console.log("Erro ao buscar totais: ", error)
    }
}

//When adding a transaction, inserts the year in the filter list if no exist
export const getUniqueYear = async (setSelectYear: (arg: any) => void) => {
    try {
        const date = await api.get("get_year.php")

        const yearList = date.data.map((item: any) => {
            return new Date(item.transaction_date).getFullYear()
        })

        const uniqueYears: any = Array.from(new Set(yearList)).sort((a:any, b:any) => b - a)
        console.log(uniqueYears)

        setSelectYear(uniqueYears)

    } catch (error: any) {
        console.log("Erro ao buscar ano: ", error)
    }
}