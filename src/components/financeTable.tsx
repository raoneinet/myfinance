import { act, useState } from "react"
import { FinanceType } from "@/types/financeTypes"
import { ItemActionBox } from "@/components/itemActionBox"

type Props = {
    finance: FinanceType[]
}

export const FinanceTable = ({ finance }: Props) => {

    const [openActionBox, setOpenActionBox] = useState(false)
    const [openIdBox, setOpenIdBox] = useState<any>()

    const handleOpenActionBox = (id: number) => {
        const openId = finance.find(item => item.id === id)
        if (openId?.id) {
            setOpenIdBox(openId.id)
            setOpenActionBox(true)
        }
    }

    const handleCloseActionBox = (id:number) =>{
        const closeId = finance.find(item => item.id === id)
        if(closeId?.id && openActionBox === true){
            setOpenIdBox(null)
            setOpenActionBox(false)
        }
    }

    return (
        <>
            <table className="w-full bg-white shadow shadow-gray-400 rounded-t-2xl">
                <thead className="bg-gray-200 text-left text-xs md:text-base">
                    <tr className="align-middle">
                        <th className="py-3 pl-2 rounded-tl-2xl">Descrição</th>
                        <th>valor</th>
                        <th>Fixo/Variável</th>
                        <th className="">Tipo de pgto</th>
                        <th>data</th>
                        <th className="rounded-tr-2xl">Ação</th>
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
                            <td>
                                {!openActionBox && openIdBox !== item.id &&
                                    (< img src="/assets/icons/menu-actions.png"
                                    className="w-6 cursor-pointer"
                                    onClick={() => handleOpenActionBox(item.id)} />)
                                }
                                {openActionBox && openIdBox === item.id &&
                                    <img src="/assets/icons/closeModal.png"
                                    className="w-6 cursor-pointer"
                                    onClick={()=>handleCloseActionBox(item.id)}/>
                                }

                                {(openActionBox && openIdBox === item.id) && <ItemActionBox />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}