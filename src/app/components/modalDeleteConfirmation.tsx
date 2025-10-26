import { ModalButtons } from "./modalButtons"
import { useDeleteFinanceMutation } from "@/redux/reducers/deleteFinanceMutation"

type Props = {
    handleUpdateAll: () => void
    id: number
    setDeleteModal: (arg: boolean)=>void
    setOpenIdBox: (arg: number | null)=>void
}

export const ModalDeleteConfirmation = ({ handleUpdateAll, id, setDeleteModal, setOpenIdBox }: Props) => {

    const [deleteFinance] = useDeleteFinanceMutation()

    const deleteSelectedTransaction = async (id: number | null) => {
        try {
            await deleteFinance(id).unwrap()
            
        } catch (error: any) {
            console.log("Error ao apagar movimento: ", error)
        }
    }

    const confirmDeletion = () => {
        deleteSelectedTransaction(id)
        setDeleteModal(false)
        handleUpdateAll()
    }

    const cancelDeletion = ()=>{
        deleteSelectedTransaction(null)
        setDeleteModal(false)
        setOpenIdBox(null)
    }


    return (
        <div className="fixed z-10 top-0 right-0 left-0 bottom-0 bg-black/50 flex justify-center items-center">
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