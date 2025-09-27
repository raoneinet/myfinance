import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AddFinanceBtn } from "@/components/addFinanceBtn"
import { AddSalaryBtn } from "@/components/addSalaryBtn"
import api from "@/app/api/api"

export const SearchExpense = ({ setModal, getFinance, getFinancePerMonth, handleShowAddSalay }: any) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [selectYear, setSelectYear] = useState<number[]>()

    const handleFilterExpense = (data: any) => {
        console.log("VALOR FILTRADO", data.month)

        if (data.month === "Mês" && data.year === "Ano") return console.log("Obrigatório informar Mês e Ano")

        getFinancePerMonth({ month: data.month, year: data.year })
    }

    const getYear = async () => {
        try {
            const date = await api.get("get_year.php")

            const yearList = date.data.map((item: any)=>{
                return new Date(item.transaction_date).getFullYear()
            })

            const uniqueYears: any = Array.from(new Set(yearList)).sort(({a, b}: any) => b - a)
            console.log(uniqueYears)

            setSelectYear(uniqueYears)

        } catch (error: any) {
            console.log("Erro ao buscar ano: ", error)
        }
    }

    useEffect(() => {
        getYear()
    }, [])


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
                    <option disabled selected>Mês</option>
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
                    <option disabled selected>Ano</option>
                    {selectYear?.map((year: number) => (
                            <option key={year} value={year}>{year}</option>
                        ))
                    }
                   
                </select>
                <div>
                    <input
                        type="submit"
                        className="px-3 py-3 text-center border border-gray-300 rounded-lg cursor-pointer outline-gray-400"
                        value="Buscar" />
                </div>
            </form>
            <AddFinanceBtn setModal={setModal} />
            <AddSalaryBtn setModal={setModal}/>
        </div>
    )
}