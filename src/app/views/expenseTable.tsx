import { FinanceType } from "@/app/types/financeTypes"
import { FinanceTable } from "@/app/components/financeTable"

type Props = {
    finance: FinanceType[]
    getFinance: ()=>void
    handleUpdateAll: ()=>void
}

export const ExpenseTable = ({finance, getFinance, handleUpdateAll}: Props) => {

    return (
        <div className="px-5 py-5 max-h-5/6 flex gap-3 lg:flex-row flex-col">
            <FinanceTable
                finance={finance}
                handleUpdateAll={handleUpdateAll}
            />
        </div>
    )
}