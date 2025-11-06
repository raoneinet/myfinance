import { ModalAddFinance } from "@/app/components/modalAddfinance"
import { useForm, SubmitHandler } from "react-hook-form"
import { SendFinanceType } from "@/app/types/sendFinanceType"
import { ModalAddSalary } from "@/app/components/modalAddSalay"
import { SalaryTypes } from "@/app/types/salaryTypes"
import { usePostFinanceMutation, usePostSalaryMutation } from "@/redux/reducers/getFinanceQuery"

type Props = {
    closeModal: () => void
    getTotals: () => void
    handleUpdate: (month:number, year:number) => void
    clickedBtn: any
}

export const InsertExpense = ({ closeModal, handleUpdate, clickedBtn }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [postFinance] = usePostFinanceMutation()
    const [postSalary] = usePostSalaryMutation()

    //Add expense
    const handleExpenseInsert: SubmitHandler<SendFinanceType> = async (data) => {
        try {
            await postFinance(data)
            
            const {expense_date} = data

            const date = expense_date.split("-")
            const month = Number(date[1])
            const year = Number(date[0])
            closeModal()
            handleUpdate(month, year)
        } catch (error: any) {
            closeModal()
            console.log("Ocorreu um erro ao enviar os seus movimentos financeiros", error)
        }
    }

    //Add salary
    const handleInsertSalary: SubmitHandler<SalaryTypes> = async (data) => {
        try {
            await postSalary(data)
           closeModal()
        } catch (error: any) {
            closeModal()
            console.log("Ocorreu um erro ao enviar os seus movimentos financeiros", error)
        }
    }

    return (
        <div
            className="fixed z-10 bg-black/50 flex justify-center pt-9 w-full h-dvh left-0 right-0 top-0 bottom-0">
            <div className="">
                {clickedBtn === "finance" &&
                    <ModalAddFinance
                        closeModal={closeModal}
                        register={register}
                        handleSubmit={handleSubmit}
                        handleExpenseInsert={handleExpenseInsert}
                        error={errors}
                    />
                }
                {clickedBtn === "salary" &&
                    <ModalAddSalary
                        handleInsertSalary={handleInsertSalary}
                        closeModal={closeModal}
                        register={register}
                        handleSubmit={handleSubmit}
                        error={errors}
                    />
                }
            </div>
        </div>
    )
}