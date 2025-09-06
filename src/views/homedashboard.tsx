import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"

export const HomeDashboard = () => {

    return (
        <>
            <div className="container mx-auto h-full">
                <TotalFinancing />
                <ExpenseTable/>
            </div>
        </>
    )
}