import {InsertExpense} from "@/views/insertExpense"

export const AddFinanceBtn = ({setModal}:any)=>{

    return (
        <>
            <button onClick={setModal} 
                className="py-2 px-3 bg-gray-700 text-white rounded-lg text-center cursor-pointer">
                <span className="text-2xl pr-2 align-middle">+</span> Adicionar Movimento
            </button>
        </>
    )
}