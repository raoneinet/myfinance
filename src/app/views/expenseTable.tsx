import { FinanceType } from "@/app/types/financeTypes"
import { FinanceTable } from "@/app/components/financeTable"

type Props = {
    finance: FinanceType[]
    getFinancePerMonth: any
}

export const ExpenseTable = ({getFinancePerMonth, finance}: Props) => {

    return (
        <div className="px-5 py-5 max-h-5/6 flex gap-3 lg:flex-row flex-col">
            <FinanceTable
                finance={finance}
                getFinancePerMonth={getFinancePerMonth}
            />
        </div>
    )
}