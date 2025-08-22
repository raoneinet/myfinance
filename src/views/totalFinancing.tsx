import { TotalCards } from "@/components/totalCards"

export const TotalFinancing = () => {
    return (
        <div className="container px-5 py-5 grid grid-cols-4 gap-4">
            <TotalCards
                title="Salário"
                value="1500,00"
            />
            <TotalCards
                title="Total Despesas"
                value="700,00"
            />
            <TotalCards
                title="Recebimentos"
                value="0,00"
            />
            <TotalCards
                title="Balanço"
                value="800,00"
            />
        </div>
    )
}