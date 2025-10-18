import { FinanceType } from "@/app/types/financeTypes"
import { FinanceTable } from "@/app/components/financeTable"

type Props = {
    finance: FinanceType[]
    handleUpdateAll: ()=>void
    getFinancePerMonth: any
}

export const ExpenseTable = ({getFinancePerMonth, finance, handleUpdateAll}: Props) => {

    return (
        <div className="px-5 py-5 max-h-5/6 flex gap-3 lg:flex-row flex-col">
            <FinanceTable
                finance={finance}
                handleUpdateAll={handleUpdateAll}
                getFinancePerMonth={getFinancePerMonth}
            />
        </div>
    )
}