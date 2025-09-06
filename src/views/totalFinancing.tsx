import { TotalCards } from "@/components/totalCards"

export const TotalFinancing = () => {
    return (
        <div className="px-5 py-5 grid md:grid-cols-4 gap-4">
            <TotalCards
                title="Salário"
                value="0,00"
                color="bg-[#ccffcc]"
            />
            <TotalCards
                title="Total Despesas"
                value="0,00"
                color="bg-[#FFBFBF]"
            />
            <TotalCards
                title="Recebimentos"
                value="0,00"
                color="bg-[#1591ea]"
            />
            <TotalCards
                title="Balanço"
                value="0,00"
                color="bg-[#FFEE8C]"
            />
        </div>
    )
}