import { FinanceType } from "@/types/financeTypes"
import { DataTable } from "@/components/table/table"
import { columns } from "@/utils/tableHead"

type Props = {
    finance: FinanceType[]
    handleUpdateAll: () => void
}

export const ExpenseTable = ({ finance, handleUpdateAll }: Props) => {
    return (
        <div className="px-5 py-5 flex gap-3 flex-col">
            <DataTable columns={columns} data={finance} handleUpdateAll={handleUpdateAll}/>
        </div>
    )
}