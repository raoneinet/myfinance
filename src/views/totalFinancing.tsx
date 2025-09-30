import { TotalCards } from "@/components/totalCards"

export const TotalFinancing = ({salary, expenseTotals, extraIncomeTotal, expenseBalance}: any) => {

    return (
        <div className="px-5 py-5 grid md:grid-cols-4 gap-4">
            <TotalCards
                title="Salário"
                value={salary}
                bgColor="bg-[#ccffcc]"
                icon="/assets/icons/salary.png"
                borderColor="border-[#b9f8cf]"
            />
            <TotalCards
                title="Despesas"
                value={expenseTotals}
                bgColor="bg-[#FFBFBF]"
                icon="/assets/icons/expense.png"
                borderColor="border-[#ffbfbf]"
            />
            <TotalCards
                title="Recebimentos"
                value={extraIncomeTotal}
                bgColor="bg-[#E0B0FF]"
                icon="/assets/icons/income.png"
                borderColor="border-[#e0b0ff]"
            />
            <TotalCards
                title="Balanço"
                value={expenseBalance}
                bgColor="bg-[#FFEE8C]"
                icon="/assets/icons/balance.png"
                borderColor="border-[#ffee8c]"
            />
        </div>
    )
}