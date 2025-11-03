import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AddFinanceBtn } from "@/app/components/addFinanceBtn"
import { AddSalaryBtn } from "@/app/components/addSalaryBtn"
import { CurrentFinanceBtn } from "@/app/components/currentFinanceBtn"
import { AllFinanceBtn } from "@/app/components/allFinaneBtn"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useGetYearListQuery } from "@/redux/reducers/getFinanceQuery"

export const SearchExpense = (
    { currentMonth, currentYear, getSalarySum,
        getSalary, setModal, requestAllFinance, getFinancePerMonth, getCurrentFinance }: any) => {

    const { register, handleSubmit } = useForm()
    const [newMonth, setNewMonth] = useState<any>()
    const theme = useSelector((state: RootState) => state.theme)
    const [uniqueYearList, setUniqueYearList] = useState<any>()

    const { data: yearList } = useGetYearListQuery()

    const handleFilterExpense = (data: any) => {
        console.log("Valores filtrado para: mês, " + data.month + " e ano, " + data.year)

        if (!data.month || !data.year) {
            console.log("Obrigatório informar Mês e Ano")
            return
        }

        if (data.month === "Mês" || data.year === "Ano") return console.log("Obrigatório informar Mês e Ano")

        getFinancePerMonth({ month: data.month, year: data.year })
        getSalary(data.month, data.year)
        handleFormatMonth()
    }

    const handleFormatMonth = () => {
        const monthOfYear = ["Janeiro", "Fevereiro", "Março", "Abril",
            "Maio", "Junho", "Julho", "Agosto", "Setembro",
            "Outubro", "Novembro", "Dezembro"]

        const index = Math.max(1, Math.min(currentMonth, 12)) - 1;
        setNewMonth(monthOfYear[index]);
    }

    useEffect(() => {
        handleFormatMonth()
    }, [currentMonth])

    useEffect(() => {
        if (yearList) {
            setUniqueYearList(yearList)

            const listingYear = yearList.map((item: any) => {
                return new Date(item.transaction_date).getFullYear()
            })

            const uniqueYears: any[] = Array.from(new Set(listingYear)).sort((a: any, b: any) => b - a)

            setUniqueYearList(uniqueYears)
        }
    }, [yearList])

    const btnThemeBg = theme.themeStatus === "light" ? "bg-gray-500" : "bg-gray-50"

    return (
        <div className="px-5 pt-5 w-full flex items-center gap-3 flex-col md:flex-row">
            <div>
                <h1 className="text-3xl font-bold text-gray-600">Transações</h1>
                {currentMonth
                    ? <p className="mt-2 font-bold text-gray-500">{newMonth} de {currentYear}</p>
                    : <p className="mt-2 font-bold text-gray-500">Todas as transações</p>
                }
            </div>
            <div className="w-full flex justify-end gap-3 flex-col md:flex-row">
                <form
                    onSubmit={handleSubmit(handleFilterExpense)}
                    className="flex flex-col md:flex-row gap-2 justify-end">
                    <AllFinanceBtn
                        requestAllFinance={requestAllFinance}
                        getSalarySum={getSalarySum}
                        btnThemeBg={btnThemeBg}
                    />
                    <CurrentFinanceBtn
                        currentFinance={getCurrentFinance}
                        btnThemeBg={btnThemeBg}
                    />
                    <select
                        {...register("month")}
                        className={`px-3 py-2 border text-gray-800 border-gray-200 rounded-xl outline-0 ${btnThemeBg}`}
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
                        className={`px-3 py-2 bg-gray-50 border text-gray-800 rounded-xl outline-0 ${btnThemeBg}`}
                        defaultValue="Ano">
                        <option disabled>Ano</option>
                        {uniqueYearList?.map((year: number) => (
                            <option key={year} value={year}>{year}</option>
                        ))
                        }

                    </select>
                    <div>
                        <input
                            type="submit"
                            className={`px-3 py-3 text-center 
                                ${btnThemeBg} hover:bg-gray-300 border border-gray-200 rounded-xl cursor-pointer outline-0`}
                            value="Buscar"
                        />
                    </div>
                </form>
                <AddFinanceBtn setModal={setModal} />
                <AddSalaryBtn setModal={setModal} />
            </div>
        </div>
    )
}