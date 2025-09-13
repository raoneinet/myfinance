

export const ModalAddFinance = ({ closeModal, register, handleSubmit, handleExpenseInsert,errors }: any) => {

    return (
        <div className="shadow shadow-gray-700 p-4 bg-white rounded-lg w-fit px-6">
            <p className="py-3">Adicionar novo movimento na tabela financeira</p>
            <form
                onSubmit={handleSubmit(handleExpenseInsert)}
                className="flex flex-col gap-5 justify-between py-5"
            >
                <div className="flex flex-col md:flex-row gap-2">
                    <input {...register("expense_desc", {required: true})}
                        className="p-2 border border-gray-300 rounded-lg" 
                        placeholder="Descrição" />
                    <input {...register("expense_value")}
                        className="p-2 border border-gray-300 rounded-lg" 
                        placeholder="Valor" />
                {errors?.expense_desc && <p>Campo obrigatorio</p>}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-3">
                    <select {...register("expense_standard_category")}
                        className="p-2 border border-gray-300 rounded-lg">
                        <option>Categoria --</option>
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
                        <option>Fixo / Variável --</option>
                        <option value="fixed">Gasto Fixo</option>
                        <option value="notFixed">Gasto Variável</option>
                    </select>
                    <select {...register("expense_payment_type")}
                        className="p-2 border border-gray-300 rounded-lg">
                        <option>Tipo de pgto --</option>
                        <option value="Crédito">Crédito</option>
                        <option value="Débito">Débito</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Transferência">Transferência</option>
                    </select>
                </div>
                <div>
                    <input 
                        type="date" {...register("expense_date")} 
                        className="p-2 border border-gray-300 rounded-lg" 
                        placeholder="Descrição" />
                </div>
                <div className="flex justify-between ">
                    <input 
                        onClick={closeModal} type="button" value="Cancelar " 
                        className="py-2 px-4 text-red-600 font-bold rounded-lg cursor-pointer" />
                    <input 
                        type="submit" value="Adicionar " 
                        className="py-2 px-4 bg-green-600 text-white font-bold rounded-lg cursor-pointer" />
                </div>
            </form>
        </div>
    )
}