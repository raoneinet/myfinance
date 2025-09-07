import { useState } from "react"
import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import { InsertExpense } from "./insertExpense"
import { SearchExpense } from "./searchFinance"
import { FinanceType } from "@/types/financeTypes"
import api from "@/app/api/api"

export const HomeDashboard = () => {

    const [showModal, setShowModal] = useState(false)
    const [finance, setFinance] = useState<FinanceType[]>([]);

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const getFinance = async () => {
        try {
            const res = await api.get("/finance.php")
            console.log("Finanças: ", res)

            if (res.status !== 200) throw new Error("Erro ao buscar finanças")

            const data = res.data.finance

            setFinance(data)
        } catch (error: any) {
            console.log("Erro ao buscar por finanças: ", error)
        }
    }

    return (
        <>
            <div className="container mx-auto h-full">
                <TotalFinancing />
                <SearchExpense
                    setModal={handleShowModal}

                />
                {showModal &&
                    <InsertExpense
                        closeModal={handleCloseModal}
                        updateDashboard={getFinance} 
                    />
                }

                <ExpenseTable
                    finance={finance}
                    getFinance={getFinance}
                />
            </div>
        </>
    )
}