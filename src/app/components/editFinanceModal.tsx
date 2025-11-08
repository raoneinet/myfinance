import { useForm } from "react-hook-form"
import { FinanceType } from "@/app/types/financeTypes"
import { ModalButtons } from "./modalButtons"
import { usePostFinanceUpdateMutation } from "@/redux/reducers/getFinanceQuery"

type Props = {
    finance: FinanceType
    setOpenActionBox: (arg: boolean) => void
    setOpenModal: (arg: boolean) => void
    setOpenIdBox: (arg: number | null) => void
    getFinancePerMonth: any
    handleUpdate: any
}

export const EditFinanceModal = ({ handleUpdate, getFinancePerMonth, finance, setOpenActionBox, setOpenModal, setOpenIdBox }: Props) => {

    const [postFinanceUpdate] = usePostFinanceUpdateMutation()
    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: finance.id,
            expense_desc: finance.transaction_desc,
            expense_value: finance.transaction_value,
            expense_standard_category: finance.standard_category,
            expense_isFixed: finance.fixed_expense,
            expense_payment_type: finance.transaction_type,
            expense_date: finance.transaction_date.split(' ')[0] // caso seja DATETIME
        }
    })

    const updateTransaction = async (data: any) => {
        
        const handleDate = data.expense_date.split("-")
        const month = Number(handleDate[1])
        const year = Number(handleDate[0])

        try {
            await postFinanceUpdate(data)
            setOpenIdBox(null)
            setOpenModal(false)
            await handleUpdate(month, year)
            console.log("ATUALIZAR ESTES VALORES", handleDate)
        } catch (error) {
            console.error("Erro ao atualizar:", error);
        }
    }

    const closeModal = () => {
        setOpenIdBox(null)
        setOpenModal(false)
    }

    return (
        <div className="fixed z-10 top-0 bottom-0 right-0 left-0 bg-black/50 flex justify-center items-center">
            <div className="shadow shadow-gray-700 p-4 bg-white rounded-lg w-fit px-6 ">
                <p className="py-3">Atualizar movimento na tabela financeira</p>
                <form onSubmit={handleSubmit(updateTransaction)}
                    className="flex flex-col gap-5 justify-between py-5"
                >
                    <div className="flex flex-col md:flex-row gap-2">
                        <input {...register("expense_desc", { required: true })}
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                        <input {...register("expense_value", { required: true })}
                            className="p-2 border border-gray-300 rounded-lg"
                            placeholder="Valor"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                        <select {...register("expense_standard_category", { required: "Campo obrigatório" })}
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
                        <select {...register("expense_isFixed", { required: "Campo obrigatório" })}
                            className="p-2 border border-gray-300 rounded-lg" aria-required>
                            <option value="fixed">Gasto Fixo</option>
                            <option value="notFixed">Gasto Variável</option>
                        </select>
                        <select {...register("expense_payment_type", { required: "Campo obrigatório" })}
                            className="p-2 border border-gray-300 rounded-lg" aria-required>
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