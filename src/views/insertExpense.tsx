import { ModalAddFinance } from "@/components/modalAddfinance"
import { useForm, SubmitHandler } from "react-hook-form"
import { SendFinanceType } from "@/types/sendFinanceType"
import api from "@/app/api/api"

type Props = {
    closeModal: () => void
    updateDashboard: () => void
    getTotals: ()=>void
}

export const InsertExpense = ({ closeModal, updateDashboard, getTotals }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleExpenseInsert: SubmitHandler<SendFinanceType> = async (data) => {

        try {
            await api.post("/add_finance.php",
                data
            ).then(
                res => console.log("Movimentos enviados: ", data)
            ).catch(
                error => console.log("Erro ao enviar dados", error)
            )

            closeModal()
            updateDashboard()
            getTotals()
        } catch (error: any) {
            console.log("Ocorreu um erro ao enviar os seus movimentos", error)
        }
        console.log("Valores do form: ", data)
    }


    return (
        <div
            className="absolute flex justify-center items-center px-5 py-5 w-full h-full left-0 right-0 bottom-0">
            <div className="absolute">
                <ModalAddFinance
                    closeModal={closeModal}
                    register={register}
                    handleSubmit={handleSubmit}
                    handleExpenseInsert={handleExpenseInsert}
                />
            </div>
        </div>
    )
}