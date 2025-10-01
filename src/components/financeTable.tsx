import { useState } from "react"
import { FinanceType } from "@/types/financeTypes"
import { ItemActionBox } from "@/components/itemActionBox"
import { EditFinanceModal } from "@/components/editFinanceModal"
import { ModalDeleteConfirmation } from "@/components/modalDeleteConfirmation"


type Props = {
    finance: FinanceType[]
    handleUpdateAll: () => void
}

export const FinanceTable = ({ finance, handleUpdateAll }: Props) => {

    const [openActionBox, setOpenActionBox] = useState(false)
    const [openIdBox, setOpenIdBox] = useState<number | null>()
    const [editFinance, setEditFinance] = useState<FinanceType>()
    const [deleteModal, setDeleteModal] = useState(true)
    const [deleFinance, setDeleteFinance] = useState<number>()
    const [openModal, setOpenModal] = useState(false)

    const handleOpenActionBox = (id: number) => {
        const openId = finance.find(item => item.id === id)
        if (openId?.id) {
            setOpenIdBox(openId.id)
            setOpenActionBox(true)
        }
    }

    const handleCloseActionBox = (id: number) => {
        const closeId = finance.find(item => item.id === id)
        if (closeId?.id && openActionBox === true) {
            setOpenIdBox(null)
            setOpenActionBox(false)
        }
    }

    return (
        <div className="lg:w-4/5 max-h-[600px] h-full overflow-y-auto rounded-t-2xl flex-1 
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-400
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
            <table className="w-full bg-white shadow relative">
                <thead className="bg-gray-200 text-left text-xs md:text-base sticky top-0">
                    <tr className="align-middle">
                        <th className="py-3 pl-2 mb-5">Descrição</th>
                        <th>valor</th>
                        <th>Fixo/Variável</th>
                        <th className="">Tipo de pgto</th>
                        <th>data</th>
                        <th className="">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {finance.map((item) => (
                        <tr
                            className="border-b border-gray-200 hover:bg-gray-200 text-xs text-gray-600 md:text-base align-middle"
                            key={item.id}>
                            <td className="py-3 pl-2 flex gap-2 items-center">
                                <img src={`/assets/icons/${item.standard_category}.png`} className="w-auto h-8" />
                                <div>
                                    <div className="font-bold">{item.transaction_desc}</div>
                                    <div className="text-xs text-gray-500 rounded-md w-fit">
                                        {item.standard_category}
                                    </div>
                                </div>
                            </td>
                            <td className={`${(item.standard_category !== "Recebimento") ?
                                "text-red-700" : "text-green-700"}`}>
                                <div className={`${(item.standard_category !== "Recebimento") ?
                                    "bg-red-200" : "bg-green-200"} w-fit rounded-lg  px-3`}>
                                    <span>{(item.standard_category !== "Recebimento") ? "- " : "+ "}</span>
                                    € {item.transaction_value}
                                </div>
                            </td>
                            <td className="">
                                {(item.fixed_expense === 'fixed') && "Gasto Fixo"}
                                {(item.fixed_expense === 'notFixed') && "Gasto Variável"}
                            </td>
                            <td>{item.transaction_type}</td>
                            <td>{item.transaction_date}</td>
                            <td className="">
                                <div>
                                    {openIdBox !== item.id &&
                                        < img src="/assets/icons/menu-actions.png"
                                            className="w-6 cursor-pointer"
                                            onClick={() => handleOpenActionBox(item.id)} />
                                    }
                                    {openActionBox && openIdBox === item.id &&
                                        <img src="/assets/icons/closeModal.png"
                                            className="w-6 cursor-pointer"
                                            onClick={() => handleCloseActionBox(item.id)} />
                                    }
                                </div>
                                <div>
                                    {(openActionBox && openIdBox === item.id) &&
                                        <ItemActionBox
                                            id={item.id}
                                            handleUpdateAll={handleUpdateAll}
                                            setEditFinance={setEditFinance}
                                            setOpenModal={setOpenModal}
                                            setOpenActionBox={setOpenActionBox}
                                            setOpenIdBox={setOpenIdBox}
                                            setDeleteFinance={setDeleteFinance}
                                            setDeleteModal={setDeleteModal}
                                        />
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editFinance && openModal === true &&
                <EditFinanceModal
                    finance={editFinance}
                    handleUpdateAll={handleUpdateAll}
                    setOpenActionBox={setOpenActionBox}
                    setOpenModal={setOpenModal}
                    setOpenIdBox={setOpenIdBox}
                />
            }
            {deleteModal && deleFinance &&
                <ModalDeleteConfirmation
                    handleUpdateAll={handleUpdateAll}
                    id={deleFinance}
                    setDeleteModal={setDeleteModal}
                    setOpenIdBox={setOpenIdBox}
                />
            }
        </div>
    )
}