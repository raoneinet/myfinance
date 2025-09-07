import {useState} from "react"
import { TotalFinancing } from "./totalFinancing"
import { ExpenseTable } from "./expenseTable"
import {InsertExpense} from "./insertExpense"
import { SearchExpense } from "./searchFinance"

export const HomeDashboard = () => {

    const [showModal, setShowModal] = useState(false)

    const handleShowModal = ()=>{
        setShowModal(true)
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
    }

    return (
        <>
            <div className="container mx-auto h-full">
                <TotalFinancing />
                <SearchExpense 
                    setModal={handleShowModal}
                />
                {showModal &&
                    <InsertExpense closeModal={handleCloseModal}/>
                }
                
                <ExpenseTable />
            </div>
        </>
    )
}