import { FinanceType } from "@/types/financeTypes"

type Props = {
    finance: FinanceType[]
}

export const FinanceTable = ({finance}: Props)=>{
    return (
        <>
        <table className="w-full bg-white rounded-t-2xl">
                <thead className="bg-gray-200 text-left">
                    <tr>
                        <th className="py-3 pl-2 rounded-tl-2xl">Descrição</th>
                        <th>valor</th>
                        <th>Categoria</th>
                        <th>Fixo/Variável</th>
                        <th>Tipo de pgto</th>
                        <th>data</th>
                        <th className="rounded-tr-2xl">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {finance.map((item) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-200"
                            key={item.id}>
                            <td className="py-3 pl-2">{item.transaction_desc}</td>
                            <td className={`${(item.standard_category !== "Recebimento") ? "text-red-700" : "text-green-700"} font-bold`}>
                                <span>{(item.standard_category !== "Recebimento") ? "-" : "+"}</span>€ {item.transaction_value}</td>
                            <td>{item.standard_category}</td>
                            <td>
                                {(item.fixed_expense === 'fixed') && "Gasto Fixo"}
                                {(item.fixed_expense === 'notFixed') && "Gasto Variável"}
                            </td>
                            <td>{item.transaction_type}</td>
                            <td className="">{item.transaction_date}</td>
                            <td>
                                <div className="flex gap-2 items-center text-center">
                                    <div className="cursor-pointer">
                                        <img src="/assets/icons/edit_icon.png" className="w-5" />
                                    </div>
                                    <div className="cursor-pointer">
                                        <img src="/assets/icons/remove_icon.png" className="w-5" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}