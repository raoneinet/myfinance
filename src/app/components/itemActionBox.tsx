import api from "@/app/api/api"
import { FinanceType } from "@/app/types/financeTypes"

type Props = {
    handleUpdateAll: () => void
    id: number
    setEditFinance: (arg: FinanceType) => void
    setOpenModal: (arg: boolean) => void
    setOpenActionBox: (arg: boolean) => void
    setOpenIdBox: (id: number) => void
    setDeleteFinance: (id: number) => void
    setDeleteModal: (arg: boolean) => void
}

export const ItemActionBox = ({
    id,
    handleUpdateAll,
    setEditFinance,
    setOpenModal,
    setOpenActionBox,
    setOpenIdBox,
    setDeleteFinance,
    setDeleteModal }: Props) => {

    const deleteTransaction = () => {
        setOpenActionBox(false)
        setDeleteFinance(id)
        setDeleteModal(true)
    }

    const editTransaction = async (id: number) => {
        try {
            const result = await api.get(`/single_finance.php?id=${id}`)
            setEditFinance(result.data)
            setOpenModal(true)
            setOpenActionBox(false)
            setOpenIdBox(id)
        } catch (error: any) {
            console.log("Ocorreu um erro ao editar a transação. ", error)
        }
    }


    return (
        <>
            <div 
                className="flex flex-col justify-center w-fit shadow shadow-gray-400 rounded-md mt-2 absolute z-20 bg-white -ml-20">
                <div
                    onClick={() => editTransaction(id)}
                    className="rounded-md hover:bg-gray-200 w-full flex gap-2 cursor-pointer font-semibold px-4 py-2 ">
                    <img src="/assets/icons/edit_icon.png" className="w-4 h-4" />
                    Editar
                </div>
                <div
                    onClick={() => deleteTransaction()}
                    className="rounded-md hover:bg-gray-200 flex gap-2 cursor-pointer font-semibold px-4 py-2">
                    <img src="/assets/icons/delete_icon.png" className="w-4 h-4" />
                    Apagar
                </div>
            </div>
        </>
    )
}