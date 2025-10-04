export type SalaryProps = {
    month: number
    year: number
    setSalary: (arg: number) => void
}

export type FinanceProps = {
     setFinance: (arg: any) => void
}

export type TotalsProps = {
    setExpenseTotals: (arg: number) => void
    setExtraIncomeTotal: (arg: number) => void
    setExpenseBalance: (arg: number) => void
    salary: number
}

export type FinanceMonthType = {
    month: number 
    year: number
    setFinance: (arg: any)=>void 
    //getTotalsByMonth: ({})=>void
}

export type TotalValuesMonthType = {
    month: number
    year: number
    salary: number
    setExpenseTotals: (arg: number)=>void
    setExtraIncomeTotal: (arg: number)=>void
    setExpenseBalance: (arg: number)=>void
}