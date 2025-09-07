import { TotalCards } from "@/components/totalCards"
import api from "@/app/api/api"

export const TotalFinancing = ({expenseTotals, extraIncomeTotal, expenseBalance}: any) => {


    return (
        <div className="px-5 py-5 grid md:grid-cols-4 gap-4">
            <TotalCards
                title="Salário"
                value="0,00"
                color="bg-[#ccffcc]"
            />
            <TotalCards
                title="Total Despesas"
                value={expenseTotals}
                color="bg-[#FFBFBF]"
            />
            <TotalCards
                title="Recebimentos"
                value={extraIncomeTotal}
                color="bg-[#1591ea]"
            />
            <TotalCards
                title="Balanço"
                value={expenseBalance}
                color="bg-[#FFEE8C]"
            />
        </div>
    )
}