import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import {InsertExpense} from "./insertExpense"
import { SearchExpense } from "./searchFinance"

export const HomeDashboard = () => {

    return (
        <>
            <div className="container mx-auto h-full">
                <TotalFinancing />
                <SearchExpense />
                <ExpenseTable />
            </div>
        </>
    )
}