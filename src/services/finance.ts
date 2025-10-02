import api from "@/app/api/api"
import { SalaryProps,
        FinanceProps,
        TotalsProps,
        FinanceMonthType,
        TotalValuesMonthType } from "@/types/financeServiceTypes"

//Request salary api
export const requestSalary = async ({ month, year, setSalary }: SalaryProps) => {
    try {
        const res = await api.get(`/get_salary.php?month=${month}&year=${year}`)

        const actual_salary = Number(res.data.salary_amount)

        setSalary(actual_salary)
        console.log("Salario atual: ", actual_salary)
    } catch (error: any) {
        console.log("Erro ao buscar sálario: ", error)
    }
}

//Request finance api
export const requestFinance = async ({ setFinance }: FinanceProps) => {
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
}

//Request Total values of all finance
export const requestTotalValues = async (
        { setExpenseTotals, setExtraIncomeTotal, setExpenseBalance, salary }: TotalsProps) => {

    try {
        const totalFinance = await api.get("/get_totals.php")

        const total_expense = Number(totalFinance.data.total_geral)
        const extra_income = Number(totalFinance.data.extra_income)

        setExpenseTotals(total_expense)
        setExtraIncomeTotal(extra_income)

        if (!isNaN(total_expense) && !isNaN(extra_income)) {
            const expenseMath = (extra_income + Number(salary)) - total_expense
            console.log("SALARIO EM SERVICES",salary)
            setExpenseBalance(expenseMath)
        }

    } catch (error: any) {
        console.log("Erro ao buscar os totais: ", error)
    }
}

//Request  all finance by filtered month and year
export const requestFinanceByMonth = async (
    { month, year, setFinance, getTotalsByMonth }: FinanceMonthType) => {

    try {
        const res = await api.get(`/finance_month.php?month=${month}&year=${year}`)

        if (res.status !== 200) return console.log("Erro ao buscar movimentos")

        setFinance(res.data)
        getTotalsByMonth({ month, year })
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