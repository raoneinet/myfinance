import { TotalCards } from "@/components/totalCards"
import api from "@/app/api/api"

export const TotalFinancing = ({expenseTotals, extraIncomeTotal, expenseBalance}: any) => {


    return (
        <div className="px-5 py-5 grid md:grid-cols-4 gap-4">
            <TotalCards
                title="Salário"
                value="0,00"
                color="bg-[#E0B0FF]"
                icon="/assets/icons/salary.png"
            />
            <TotalCards
                title="Despesas"
                value={expenseTotals}
                color="bg-[#FFBFBF]"
                icon="/assets/icons/expense.png"
            />
            <TotalCards
                title="Recebimentos"
                value={extraIncomeTotal}
                color="bg-[#ccffcc]"
                icon="/assets/icons/income.png"
            />
            <TotalCards
                title="Balanço"
                value={expenseBalance}
                color="bg-[#FFEE8C]"
                icon="/assets/icons/balance.png"
            />
        </div>
    )
}