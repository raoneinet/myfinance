

export const ExpenseTable = ()=>{
    return (
        <div className="px-5 py-5 w-full">
            <table className="w-full bg-white rounded-t-2xl">
                <thead className="bg-gray-100 text-left">
                    <tr className="">
                        <th className="py-3 pl-2 rounded-tl-2xl">Transação</th>
                        <th className="">valor</th>
                        <th className="">descrição</th>
                        <th className="">Tipo de pgto</th>
                        <th className="rounded-tr-2xl">data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                        <td className="py-3 pl-2 rounded-bl-2xl">Aluguel</td>
                        <td>800</td>
                        <td>Casa</td>
                        <td>Cartão</td>
                        <td className="rounded-br-2xl">07/09/2024</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}