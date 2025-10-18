import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AddFinanceBtn } from "@/app/components/addFinanceBtn"
import { AddSalaryBtn } from "@/app/components/addSalaryBtn"
import { CurrentFinanceBtn } from "@/app/components/currentFinanceBtn"
import { AllFinanceBtn } from "@/app/components/allFinaneBtn"
import { getUniqueYear } from "@/app/services/finance"

export const SearchExpense = ({ currentMonth, currentYear, getSalarySum, getSalary, setModal, getFinance, getFinancePerMonth, getCurrent }: any) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [selectYear, setSelectYear] = useState<number[]>()
    const [newMonth, setNewMonth] = useState<any>()

    const handleFilterExpense = (data: any) => {
        console.log("Valores filtrado para: mês, " + data.month + " e ano, " + data.year)

        if (!data.month || !data.year) return console.log("Obrigatório informar Mês e Ano")
        if (data.month === "Mês" || data.year === "Ano") return console.log("Sem Mes ou Ano")

        getFinancePerMonth({ month: data.month, year: data.year })
        getSalary(data.month, data.year)
        handleFormatMonth()
    }

    const handleFormatMonth = () => {
        const monthOfYear = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        const index = Math.max(1, Math.min(currentMonth, 12)) - 1;
        setNewMonth(monthOfYear[index]);
    }

    useEffect(() => {
        handleFormatMonth()
    }, [currentMonth])

    useEffect(() => {
        if (selectYear?.length != 0) getUniqueYear(setSelectYear)
    }, [])


    return (
        <div className="px-5 pt-5 w-full flex items-center gap-3 flex-col md:flex-row">
            <div>
                <h1 className="text-3xl font-bold text-gray-600">Transações</h1>
                {currentMonth ?
                    <p className="mt-2 font-bold text-gray-500">{newMonth} de {currentYear}</p>
                    : <p className="mt-2 font-bold text-gray-500">Todas as transações</p>
                }
            </div>
            <div className="w-full flex justify-end gap-3 flex-col md:flex-row">
                <form
                    onSubmit={handleSubmit(handleFilterExpense)}
                    className="flex flex-col md:flex-row gap-2 justify-end">
                    <AllFinanceBtn allFinance={getFinance} getSalarySum={getSalarySum} />
                    <CurrentFinanceBtn currentFinance={getCurrent} />
                    <select
                        {...register("month")}
                        className="px-3 py-2 bg-gray-50 border text-gray-600 border-gray-200 rounded-xl outline-0"
                        defaultValue="Mês">
                        <option disabled>Mês</option>
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
                        className="px-3 py-2 bg-gray-50 border text-gray-600 border-gray-200 rounded-xl outline-0"
                        defaultValue="Ano">
                        <option disabled>Ano</option>
                        {selectYear?.map((year: number) => (
                            <option key={year} value={year}>{year}</option>
                        ))
                        }

                    </select>
                    <div>
                        <input
                            type="submit"
                            className="px-3 py-3 text-center bg-gray-50 hover:bg-gray-300 border border-gray-200 rounded-xl cursor-pointer outline-0"
                            value="Buscar" />
                    </div>
                </form>
                <AddFinanceBtn setModal={setModal} />
                <AddSalaryBtn setModal={setModal} />
            </div>
        </div>
    )
}