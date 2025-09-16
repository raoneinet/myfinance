import { ModalButtons } from "./modalButtons"

export const ModalAddFinance = ({ closeModal, register, handleSubmit, handleExpenseInsert, errors }: any) => {

    return (
        <div className="shadow shadow-gray-700 p-4 bg-white rounded-lg w-fit px-6">
            <p className="py-3">Adicionar novo movimento na tabela financeira</p>
            <form
                onSubmit={handleSubmit(handleExpenseInsert)}
                className="flex flex-col gap-5 justify-between py-5"
            >
                <div className="flex flex-col md:flex-row gap-2">
                    <input {...register("expense_desc", { required: true })}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Descrição" />
                    <input {...register("expense_value", { required: true })}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Valor" />
                    {errors?.expense_desc && <p>Campo obrigatorio</p>}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-3">
                    <select {...register("expense_standard_category", { required: "Campo obrigatório" })}
                        className="p-2 border border-gray-300 rounded-lg" aria-required>
                        <option disabled>Categoria --</option>
                        <option value="Alimentação">Alimentação</option>
                        <option value="Casa">Casa</option>
                        <option value="Educação">Educação</option>
                        <option value="Entretenimento">Entretenimento</option>
                        <option value="Lazer">Lazer</option>
                        <option value="Recebimento">Recebimento</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Transporte">Transporte</option>
                    </select>
                    <select {...register("expense_isFixed", { required: "Campo obrigatório" })}
                        className="p-2 border border-gray-300 rounded-lg" aria-required>
                        <option disabled>Fixo / Variável --</option>
                        <option value="fixed">Gasto Fixo</option>
                        <option value="notFixed">Gasto Variável</option>
                    </select>
                    <select {...register("expense_payment_type", { required: "Campo obrigatório" })}
                        className="p-2 border border-gray-300 rounded-lg" aria-required>
                        <option disabled>Tipo de pgto --</option>
                        <option value="Crédito">Crédito</option>
                        <option value="Débito">Débito</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Transferência">Transferência</option>
                    </select>
                </div>
                <div>
                    <input
                        type="date" {...register("expense_date", { required: true })}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Descrição" />
                </div>
                <div className="">
                    <ModalButtons
                        onClick={closeModal}
                        cancel="Cancelar"
                        saveFinance="Adicionar"
                    />
                </div>
            </form>
        </div>
    )
}