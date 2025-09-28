import { ModalAddFinance } from "@/components/modalAddfinance"
import { useForm, SubmitHandler } from "react-hook-form"
import { SendFinanceType } from "@/types/sendFinanceType"
import { ModalAddSalary } from "@/components/modalAddSalay"
import { SalaryTypes } from "@/types/salaryTypes"
import api from "@/app/api/api"

type Props = {
    closeModal: () => void
    updateDashboard: () => void
    getTotals: () => void
    getFinancePerMonth: ({ month, year }: any) => void
    clickedBtn: any
}

export const InsertExpense = ({ closeModal, updateDashboard, getTotals, getFinancePerMonth, clickedBtn }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    //Add expense
    const handleExpenseInsert: SubmitHandler<SendFinanceType> = async (data) => {

        try {
            await api.post("/add_finance.php", data)
                .then(res => console.log("Movimentos enviados: ", data))
                .catch(error => console.log("Erro ao enviar dados", error))

            const date = data.expense_date.split("-")

            closeModal()
            updateDashboard()
            getTotals()
            getFinancePerMonth({ month: date[1], year: date[0] })
        } catch (error: any) {
            console.log("Ocorreu um erro ao enviar os seus movimentos", error)
        }
    }

    //Add salary
    const handleInsertSalary: SubmitHandler<SalaryTypes> = async (data) => {
        try {
            await api.post("/add_salary.php", data)

            closeModal()
            updateDashboard()
            getTotals()
        } catch (error: any) {
            console.log("Ocorreu um erro ao enviar os seus movimentos", error)
        }
    }


    return (
        <div
            className="fixed z-10 bg-black/50 flex justify-center items-center w-full h-dvh left-0 right-0 top-0 bottom-0">
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