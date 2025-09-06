import { useForm, SubmitHandler } from "react-hook-form"

export const InsertExpense = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleExpenseInsert = () => {

    }
    return (
        <div className="px-5 py-5 w-full">
            <p>Adicionar novas transações na tabela financeira</p>
            <form onSubmit={handleSubmit(handleExpenseInsert)} className="flex gap-2">
                <input {...register("expense_desc")} className="p-2 border border-gray-300 rounded-lg" placeholder="Descrição" />
                <input {...register("expense_value")} className="p-2 border border-gray-300 rounded-lg" placeholder="Valor" />
                <select {...register("expense_category")}
                    className="p-2 border border-gray-300 rounded-lg">
                    <option value="">Entretenimneto</option>
                    <option value="Recebimento">Recebimento</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Casa">Casa</option>
                </select>
                <select {...register("expense_isFixed")}
                    className="p-2 border border-gray-300 rounded-lg">
                    <option value="fixed">Gasto Fixo</option>
                    <option value="notFixed">Gasto Variável</option>
                </select>
                <select {...register("expense_payment_type")}
                    className="p-2 border border-gray-300 rounded-lg">
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Transferência">Transferência</option>
                    <option value="Cartão">Cartão</option>
                </select>
                <input type="date" {...register("expense_date")} className="p-2 border border-gray-300 rounded-lg" placeholder="Descrição" />
                <input type="submit" value="Adicionar " className="py-2 px-4 bg-green-600 text-white font-bold rounded-lg cursor-pointer"/>
            </form>
        </div>
    )
}