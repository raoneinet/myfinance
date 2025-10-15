import api from "@/app/api/api"
import {
    SalaryProps,
    FinanceProps,
    TotalsProps,
    FinanceMonthType,
    TotalValuesMonthType
} from "@/app/types/financeServiceTypes"

//Request salary
export const requestSalary = async ({ month, year, setSalary }: SalaryProps): Promise<number> => {
    try {
        const res = await api.get(`/get_salary.php?month=${month}&year=${year}`)

        const actual_salary = Number(res.data.salary_amount ?? 0)

        console.log("Salario atual: ", actual_salary)

        setSalary(actual_salary)

        return actual_salary

    } catch (error: any) {
        console.log("Erro ao buscar sálario: ", error)
        setSalary(0)
        return 0 // Always return a value, even on error
    }
}

export const requestSalarySum = async (setSalary: (arg: number) => void) => {
    try {
        const res = await api.get("/get_totals_salary.php")

        const sumSalaries = Number(res.data.total_salaries)

        console.log("Soma de todos os salários: ", sumSalaries)

        setSalary(sumSalaries)
        return sumSalaries

    } catch (error: any) {
        console.log("Erro ao buscar soma dos salários: ", error)
        setSalary(0)
        return 0
    }
}

//Request all transactions without filter
export const requestFinance = async ({ setFinance }: FinanceProps): Promise<void> => {
    try {
        const res = await api.get("/finance.php")

        const data = res.data.finance || []
        console.log(data)

        setFinance(data)
    } catch (error: any) {
        console.log("Erro ao buscar por finanças: ", error)
        setFinance([]) // Set empty array on error to prevent undefined issues
    }
}

//Request sums of Total values without filter
export const requestTotalValues = async (
    { setExpenseTotals, setExtraIncomeTotal, setExpenseBalance, salary }: TotalsProps
): Promise<void> => {
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
        // Set defaults on error
        setExpenseTotals(0)
        setExtraIncomeTotal(0)
        setExpenseBalance(0)
    }
}

//Request transactions by filtered month and year
export const requestFinanceByMonth = async ({ month, year, setFinance }: FinanceMonthType): Promise<void> => {
    try {
        if(!month || !year) return

        const res = await api.get(`/finance_month.php?month=${month}&year=${year}`)

        if (res.status !== 200) {
            console.log("Erro ao buscar movimentos")
            setFinance([])
            return
        }

        setFinance(res.data || [])
    } catch (error: any) {
        console.log("Erro ao buscar movimentos: ", error)
        setFinance([]) // Set empty array on error
    }
}

//Request total values filtered by month and year
export const requestTotalValuesByMonth = async (
    { month, year, salary, setExpenseTotals, setExtraIncomeTotal, setExpenseBalance }: TotalValuesMonthType
): Promise<void> => {
    try {
        const totalFinance = await api.get(`/totals_month.php?month=${month}&year=${year}`)

        const total_expense = Number(totalFinance.data.total_geral ?? 0)
        const extra_income = Number(totalFinance.data.extra_income ?? 0)

        setExpenseTotals(total_expense)
        setExtraIncomeTotal(extra_income)

        const balance = (extra_income + salary) - total_expense
        setExpenseBalance(balance)

    } catch (error: any) {
        console.log("Erro ao buscar totais: ", error)
        // Set defaults on error
        setExpenseTotals(0)
        setExtraIncomeTotal(0)
        setExpenseBalance(0)
    }
}

//When adding a transaction, inserts the year in the filter list if no exist
export const getUniqueYear = async (setSelectYear: (arg: any) => void): Promise<void> => {
    try {
        const date = await api.get("get_year.php")

        const yearList = date.data.map((item: any) => {
            return new Date(item.transaction_date).getFullYear()
        })

        const uniqueYears: any[] = Array.from(new Set(yearList)).sort((a: any, b: any) => b - a)
        console.log(uniqueYears)

        setSelectYear(uniqueYears)

    } catch (error: any) {
        console.log("Erro ao buscar ano: ", error)
        setSelectYear([]) // Set empty array on error
    }
}