import { useForm, SubmitHandler } from "react-hook-form"
import { AddFinanceBtn } from "@/components/addFinanceBtn"
import { AddSalaryBtn } from "@/components/addSalaryBtn"

export const SearchExpense = ({ setModal }: any) => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleExpenseInsert = () => {

    }
    return (
        <div className="px-5 py-5 w-full flex justify-end gap-3 flex-col md:flex-row">
            <form onSubmit={handleSubmit(handleExpenseInsert)} className="flex flex-col md:flex-row gap-2 justify-end">
                <select {...register("expense_isFixed")}
                    className="px-2 border border-gray-300 rounded-lg">
                    <option value="fixed">Gasto Fixo</option>
                    <option value="notFixed">Gasto Variável</option>
                </select>
                <select {...register("expense_category")}
                    className="px-2 border border-gray-300 rounded-lg">
                    <option value="Alimentação">Alimentação</option>
                    <option value="Casa">Casa</option>
                    <option value="Educação">Educação</option>
                    <option value="Entretenimento">Entretenimento</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Recebimento">Recebimento</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Transporte">Transporte</option>
                </select>
                <select {...register("expense_payment_type")}
                    className="px-2 border border-gray-300 rounded-lg">
                    <option value="Crédito">Crédito</option>
                    <option value="Débito">Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Transferência">Transferência</option>
                </select>
                <div className="flex items-center w-full">
                    <img src="/assets/icons/search_icon.png" className="-mr-7" />
                    <input {...register("search_expense")} className="w-full pl-8 py-3 border border-gray-300 rounded-lg" placeholder="Buscar valor..." />
                </div>
            </form>
            <AddFinanceBtn
                setModal={setModal}
            />
            <AddSalaryBtn />
        </div>
    )
}