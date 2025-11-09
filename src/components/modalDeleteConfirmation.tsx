import { ModalButtons } from "./modalButtons"
import api from "@/app/api/api"

type Props = {
    handleUpdateAll: () => void
    id: number
    setDeleteModal: (arg: boolean)=>void
    setOpenIdBox: (arg: number | null)=>void
}

export const ModalDeleteConfirmation = ({ handleUpdateAll, id, setDeleteModal, setOpenIdBox }: Props) => {

    const deleteTransaction = async (id: number | null) => {
        try {
            await api.post("/delete_finance_item.php", { id })
            console.log("Movimento apagado: ", id)
            
            handleUpdateAll()
        } catch (error: any) {
            console.log("Error ao apagar movimento: ", error)
        }
    }

    const confirmDeletion = () => {
        deleteTransaction(id)
        setDeleteModal(false)
    }

    const cancelDeletion = ()=>{
        deleteTransaction(null)
        setDeleteModal(false)
        setOpenIdBox(null)
    }


    return (
        <div className="fixed z-10 top-0 right-0 left-0 bottom-0 bg-black/50 flex justify-center items-center">
            <div className="shadow shadow-gray-700 p-4 bg-neutral-600 rounded-lg w-fit px-6">
                <div className="py-6 max-w-96">
                    <p className="text-lg text-gray-50">Esta ação irá apagar a transação permanentemente e não pode ser revertida.</p>
                </div>
                <ModalButtons
                    handleCancel={cancelDeletion}
                    leftBtn="Cancel"
                    rightBtn="Confirmar"
                    handleConfirm={confirmDeletion}
                />
            </div>
        </div>
    )
}