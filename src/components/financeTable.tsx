import { FinanceType } from "@/types/financeTypes"

type Props = {
    finance: FinanceType[]
}

export const FinanceTable = ({ finance }: Props) => {
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
                                    <div className="text-xs text-gray-500 rounded-md w-fit px-2">{item.standard_category}</div>
                                </div>
                            </td>
                            <td className={`${(item.standard_category !== "Recebimento") ? "text-red-700" : "text-green-700"}`}>
                                <div className={`${(item.standard_category !== "Recebimento") ? "bg-red-200" : "bg-green-200"} w-fit rounded-lg  px-3`}>
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
                               <img src="/assets/icons/menu-actions.png" className="w-6 cursor-pointer"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}