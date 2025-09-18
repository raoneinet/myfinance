import { ModalButtons } from "./modalButtons"
import api from "@/app/api/api"

type Props = {
    setDeleteFinance: any
    handleUpdateAll: () => void
    setOpenActionBox: any
    id: any
    setDeleteModal: any
}

export const ModalDeleteConfirmation = ({ handleUpdateAll, id, setDeleteModal }: Props) => {

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
    }


    return (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/50 flex justify-center items-center">
            <div className="shadow shadow-gray-700 p-4 bg-white rounded-lg w-fit px-6">
                <div className="py-6 max-w-96">
                    <p>Esta ação irá apagar a transação permanentemente e não pode ser revertida.</p>
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