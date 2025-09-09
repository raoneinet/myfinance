
type Props = {
    title: string
    value: string
    color: string
    icon: string
}

export const TotalCards = ({ title, value, color, icon }: Props) => {
    return (
        <div className={`bg-white rounded-lg shadow shadow-gray-400`}>
            <div className="flex flex-col px-2 py-3">
                <div className={`font-bold flex gap-2`}>
                    <img src={icon} className="w-6" />
                    <div className="flex gap-1">
                        {title}
                        <span className="text-xs align-super">(mês)</span>
                    </div>
                </div>
                <div 
                    className={`${(Number(value) < 0) ? "text-red-600" : ""} 
                                ${title === "Despesas" ? "text-red-500" : "text-green-500"}`}>
                    € {value}
                </div>
            </div>
        </div>
    )
}