import api from "@/app/api/api"
import { useState } from "react"
import { FinanceType } from "@/types/financeTypes"

type Props = {
    handleUpdateAll: () => void
    id: any
    setEditFinance?: any
    setOpenModal: any
    setOpenActionBox: any
}

export const ItemActionBox = ({ id, handleUpdateAll, setEditFinance, setOpenModal, setOpenActionBox }: Props) => {

    const deleteTransaction = async (id: number) => {
        try {
            await api.post("/delete_finance_item.php", { id })
            console.log("Movimento apagado: ", id)
            setOpenActionBox(false)
            handleUpdateAll()
        } catch (error: any) {
            console.log("Error ao apagar movimento: ", error)
        }
    }

    const editTransaction = async (id: number) => {
        const result = await api.get(`/single_finance.php?id=${id}`,)
        setEditFinance(result.data)
        setOpenModal(true)
        setOpenActionBox(false)
    }



    return (
        <>
            <div className="flex flex-col justify-center w-fit shadow shadow-gray-400 rounded-md mt-2 absolute bg-white -ml-20">
                <div
                    onClick={() => editTransaction(id)}
                    className="rounded-md hover:bg-gray-200 w-full flex gap-2 cursor-pointer font-semibold px-4 py-2 ">
                    <img src="/assets/icons/edit_icon.png" className="w-4 h-4" />
                    Editar
                </div>
                <div
                    onClick={() => deleteTransaction(id)}
                    className="rounded-md hover:bg-gray-200 flex gap-2 cursor-pointer font-semibold px-4 py-2">
                    <img src="/assets/icons/delete_icon.png" className="w-4 h-4" />
                    Apagar
                </div>
            </div>
        </>
    )
}