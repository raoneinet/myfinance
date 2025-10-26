import { ModalAddFinance } from "@/app/components/modalAddfinance"
import { useForm, SubmitHandler } from "react-hook-form"
import { SendFinanceType } from "@/app/types/sendFinanceType"
import { ModalAddSalary } from "@/app/components/modalAddSalay"
import { SalaryTypes } from "@/app/types/salaryTypes"
import { usePostSalaryMutation } from "@/redux/reducers/postSalaryMutation"
import { usePostFinanceMutation } from "@/redux/reducers/postFinanceMutation"

type Props = {
    closeModal: () => void
    updateDashboard: () => void
    getTotals: () => void
    getFinancePerMonth: ({ month, year }: any) => void
    clickedBtn: any
}

export const InsertExpense = ({ closeModal, updateDashboard, getTotals, getFinancePerMonth, clickedBtn }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [postSalary] = usePostSalaryMutation()
    const [postFinance] = usePostFinanceMutation()

    //Add expense
    const handleExpenseInsert: SubmitHandler<SendFinanceType> = async (data) => {
        try {
            await postFinance(data).unwrap()

            const date = data.expense_date.split("-")

            closeModal()
            updateDashboard()
            getTotals()
            getFinancePerMonth({ month: date[1], year: date[0] })
        } catch (error: any) {
            closeModal()
            console.log("Ocorreu um erro ao enviar os seus movimentos financeiros", error)
        }
    }

    //Add salary
    const handleInsertSalary: SubmitHandler<SalaryTypes> = async (data) => {
        try {
            await postSalary(data).unwrap()

            closeModal()
            updateDashboard()
            getTotals()
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