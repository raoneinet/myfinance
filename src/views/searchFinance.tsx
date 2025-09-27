import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { AddFinanceBtn } from "@/components/addFinanceBtn"
import { AddSalaryBtn } from "@/components/addSalaryBtn"

export const SearchExpense = ({ setModal, getFinance, getFinancePerMonth }: any) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [month, setMonth] = useState<number>()

    const handleFilterExpense = (data: any) => {
        console.log("VALOR FILTRADO", month)
        setMonth(data.month)
        getFinancePerMonth({ month: data.month, year: data.year})
    }

    return (
        <div className="px-5 py-5 w-full flex justify-end gap-3 flex-col md:flex-row">
            <form
                onSubmit={handleSubmit(handleFilterExpense)}
                className="flex flex-col md:flex-row gap-2 justify-end">
                    <input
                        type="button"
                        onClick={getFinance}
                        className="px-2 bg-gray-200 text-center w-fit rounded-lg text-gray-600 cursor-pointer outline-gray-400" 
                        value="Todas as transações" />
                <select
                    {...register("month")}
                    className="px-3 border border-gray-300 rounded-lg outline-gray-400">
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
                <select 
                    {...register("year")} 
                    className="px-3 border border-gray-300 rounded-lg outline-gray-400">
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </select>
                <div>
                    <input 
                        type="submit"
                        className="px-3 py-3 text-center border border-gray-300 rounded-lg cursor-pointer outline-gray-400" 
                        value="Buscar" />
                </div>
            </form>
            <AddFinanceBtn
                setModal={setModal}
            />
            <AddSalaryBtn />
        </div>
    )
}