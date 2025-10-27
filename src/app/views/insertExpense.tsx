import { ModalAddFinance } from "@/app/components/modalAddfinance"
import { useForm, SubmitHandler } from "react-hook-form"
import { SendFinanceType } from "@/app/types/sendFinanceType"
import { ModalAddSalary } from "@/app/components/modalAddSalay"
import { SalaryTypes } from "@/app/types/salaryTypes"

type Props = {
    closeModal: () => void
    getTotals: () => void
    getFinancePerMonth: ({ month, year }: any) => void
    clickedBtn: any
}

export const InsertExpense = ({ closeModal, getTotals, getFinancePerMonth, clickedBtn }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    //Add expense
    const handleExpenseInsert: SubmitHandler<SendFinanceType> = async (data) => {
        try {
          
        } catch (error: any) {
            closeModal()
            console.log("Ocorreu um erro ao enviar os seus movimentos financeiros", error)
        }
    }

    //Add salary
    const handleInsertSalary: SubmitHandler<SalaryTypes> = async (data) => {
        try {
           
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