import { ModalAddFinance } from "@/components/modalAddfinance"
import { useForm, SubmitHandler } from "react-hook-form"
import { SendFinanceType } from "@/types/sendFinanceType"
import api from "@/app/api/api"

type Props = {
    closeModal: () => void
    updateDashboard: () => void
    getTotals: ()=>void
    getFinancePerMonth: ({month, year}: any)=>void
}

export const InsertExpense = ({ closeModal, updateDashboard, getTotals, getFinancePerMonth }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleExpenseInsert: SubmitHandler<SendFinanceType> = async (data) => {

        try {
            await api.post("/add_finance.php", data)
            .then(res => console.log("Movimentos enviados: ", data))
            .catch(error => console.log("Erro ao enviar dados", error))

            const yearMonth = data.expense_date.split("-")

            closeModal()
            //updateDashboard()
            getTotals()
            getFinancePerMonth({month: yearMonth[1], year: yearMonth[0]})
        } catch (error: any) {
            console.log("Ocorreu um erro ao enviar os seus movimentos", error)
        }
    }


    return (
        <div
            className="fixed z-10 bg-black/50 flex justify-center items-center w-full h-dvh left-0 right-0 top-0 bottom-0">
            <div className="">
                <ModalAddFinance
                    closeModal={closeModal}
                    register={register}
                    handleSubmit={handleSubmit}
                    handleExpenseInsert={handleExpenseInsert}
                    error={errors}
                />
            </div>
        </div>
    )
}