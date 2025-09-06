"use client"
import { useState, useEffect } from "react"
import api from "@/app/api/api"
import { FinanceType } from "@/types/financeTypes"

export const ExpenseTable = () => {

    const [finance, setFinance] = useState<FinanceType[]>([]);
    const [transactionType, setTransactionType] = useState<string>()

    useEffect(() => {
        const getFinance = async () => {
            try {
                const res = await api.get("/finance.php")
                console.log("Finanças: ", res)

                if (res.status !== 200) throw new Error("Erro ao buscar finanças")

                const data = res.data.finance

                setFinance(data)
            } catch (error: any) {
                console.log("Erro ao buscar por finanças: ", error)
            }
        }

        getFinance()
    }, [])

    return (
        <div className="px-5 py-5 w-full">
            <table className="w-full bg-white rounded-t-2xl">
                <thead className="bg-gray-200 text-left">
                    <tr className="">
                        <th className="py-3 pl-2 rounded-tl-2xl">Descrição</th>
                        <th className="">valor</th>
                        <th className="">Categoria</th>
                        <th className="">Fixo/Variável</th>
                        <th className="">Tipo de pgto</th>
                        <th className="rounded-tr-2xl">data</th>
                    </tr>
                </thead>
                <tbody>
                    {finance?.map((item) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-200"
                            key={item.id}>
                            <td className="py-3 pl-2">{item.transaction_desc}</td>
                            <td className={`${(item.standard_category !== "Recebimento") ? "text-red-700" : "text-green-700"} font-bold`}>
                                <span>{(item.standard_category !== "Recebimento") ? "-" : "+"}</span>€ {item.transaction_value}</td>
                            <td>{item.standard_category}</td>
                            <td>{(item.fixed_expense == true) ? "Fixo" : "Variável"}</td>
                            <td>{item.transaction_type}</td>
                            <td className="">{item.transaction_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}