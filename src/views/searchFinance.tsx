import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AddFinanceBtn } from "@/components/addFinanceBtn"
import { AddSalaryBtn } from "@/components/addSalaryBtn"
import { CurrentFinanceBtn } from "@/components/currentFinanceBtn"
import { AllFinanceBtn } from "@/components/allFinaneBtn"
import { getUniqueYear } from "@/services/finance"

export const SearchExpense = ({ getSalarySum, getSalary, setModal, getFinance, getFinancePerMonth, getCurrent }: any) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [selectYear, setSelectYear] = useState<number[]>()

    const handleFilterExpense = (data: any) => {
        console.log("Valores filtrado para: mês, " + data.month + " e ano, " + data.year)

        if (data.month === "Mês" && data.year === "Ano") return console.log("Obrigatório informar Mês e Ano")

        getFinancePerMonth({ month: data.month, year: data.year })
        getSalary(data.month, data.year)
    }

    useEffect(() => {
        if(selectYear?.length != 0) getUniqueYear(setSelectYear)
    }, [])


    return (
        <div className="px-5 py-5 w-full flex items-center gap-3 flex-col md:flex-row">
            <div>
                <h1 className="text-3xl font-bold text-gray-600">Transações</h1>
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
                <AddFinanceBtn setModal={setModal}/>
                <AddSalaryBtn setModal={setModal} />
            </div>
        </div>
    )
}