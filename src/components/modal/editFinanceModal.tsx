import { useForm } from "react-hook-form"
import { FinanceType } from "@/types/financeTypes"
import api from "@/app/api/api"
import { ModalButtons } from "@/components/modal/modalButtons"

type Props = {
    finance: FinanceType
    handleUpdateAll: () => void
    setEditFinance: any
}

export const EditFinanceModal = ({ finance, handleUpdateAll, setEditFinance }: Props) => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: finance.id,
            transaction_desc: finance.transaction_desc,
            transaction_value: finance.transaction_value,
            standard_category: finance.standard_category,
            fixed_expense: finance.fixed_expense,
            transaction_type: finance.transaction_type,
            transaction_date: finance.transaction_date.split(' ')[0]
        }
    })

    const updateTransaction = async (data: any) => {
        try {
            const response = await api.post(`/edit_finance.php`, {
                ...data,
                id: finance.id
            })
            handleUpdateAll()
            setEditFinance(null)
        } catch (error) {
            console.error("Erro ao atualizar:", error);
        }
    }

    const closeModal = () => {
        setEditFinance(null)
        console.log("closed Modal")
    }

    return (
        <div className="fixed z-10 top-0 bottom-0 right-0 left-0 bg-black/50 flex justify-center items-center">
            <div className="shadow shadow-gray-700 p-4 bg-white rounded-lg w-fit px-6 ">
                <p className="py-3">Atualizar movimento na tabela financeira</p>
                <form onSubmit={handleSubmit(updateTransaction)}
                    className="flex flex-col gap-5 justify-between py-5"
                >
                    <div className="flex flex-col md:flex-row gap-2">
                        <input {...register("transaction_desc", { required: true })}
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                        <input {...register("transaction_value", { required: true })}
                            className="p-2 border border-gray-300 rounded-lg"
                            placeholder="Valor"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                        <select {...register("standard_category", { required: "Campo obrigatório" })}
                            className="p-2 border border-gray-300 rounded-lg" aria-required>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Casa">Casa</option>
                            <option value="Educação">Educação</option>
                            <option value="Entretenimento">Entretenimento</option>
                            <option value="Lazer">Lazer</option>
                            <option value="Recebimento">Recebimento</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Transporte">Transporte</option>
                        </select>
                        <select {...register("fixed_expense", { required: "Campo obrigatório" })}
                            className="p-2 border border-gray-300 rounded-lg" aria-required>
                            <option value="fixed">Gasto Fixo</option>
                            <option value="notFixed">Gasto Variável</option>
                        </select>
                        <select {...register("transaction_type", { required: "Campo obrigatório" })}
                            className="p-2 border border-gray-300 rounded-lg" aria-required>
                            <option value="Crédito">Crédito</option>
                            <option value="Débito">Débito</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Transferência">Transferência</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="date" {...register("transaction_date", { required: true })}
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="">
                        <ModalButtons
                            handleCancel={closeModal}
                            leftBtn="Cancelar"
                            rightBtn="Salvar"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}