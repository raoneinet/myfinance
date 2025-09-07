

export const ModalAddFinance = ({ closeModal, register, handleSubmit, handleExpenseInsert }: any) => {
    
    return (
        <div className="shadow shadow-gray-700 p-4 bg-white rounded-lg w-fit">
            <p>Adicionar novas transações na tabela financeira</p>
            <form onSubmit={handleSubmit(handleExpenseInsert)} className="flex flex-col gap-5 justify-between">
                <div className="flex gap-2">
                    <input {...register("expense_desc")} className="p-2 border border-gray-300 rounded-lg" placeholder="Descrição" />
                    <input {...register("expense_value")} className="p-2 border border-gray-300 rounded-lg" placeholder="Valor" />
                </div>
                <div className="flex justify-between">
                    <select {...register("expense_standard_category")}
                        className="p-2 border border-gray-300 rounded-lg">
                        <option value="Alimentação">Alimentação</option>
                        <option value="Casa">Casa</option>
                        <option value="Educação">Educação</option>
                        <option value="Entretenimento">Entretenimento</option>
                        <option value="Lazer">Lazer</option>
                        <option value="Recebimento">Recebimento</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Transporte">Transporte</option>
                    </select>
                    <select {...register("expense_isFixed")}
                        className="p-2 border border-gray-300 rounded-lg">
                        <option value="fixed">Gasto Fixo</option>
                        <option value="notFixed">Gasto Variável</option>
                    </select>
                    <select {...register("expense_payment_type")}
                        className="p-2 border border-gray-300 rounded-lg">
                        <option value="Crédito">Crédito</option>
                        <option value="Débito">Débito</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Transferência">Transferência</option>


                    </select>
                </div>
                <div>
                    <input type="date" {...register("expense_date")} className="p-2 border border-gray-300 rounded-lg" placeholder="Descrição" />
                </div>
                <div className="flex justify-between">
                    <input onClick={closeModal} type="submit" value="Cancelar " className="py-2 px-4 bg-red-600 text-white font-bold rounded-lg cursor-pointer" />
                    <input type="submit" value="Adicionar " className="py-2 px-4 bg-green-600 text-white font-bold rounded-lg cursor-pointer" />
                </div>
            </form>
        </div>
    )
}