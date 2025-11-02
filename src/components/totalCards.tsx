
type Props = {
    title: string
    value: number
    bgColor: string
    icon: string
    borderColor: string
}

export const TotalCards = ({ title, value, bgColor, icon, borderColor }: Props) => {
    return (
        <div className={`bg-neutral-800 rounded-lg shadow border ${borderColor}`}>
            <div className="flex flex-col justify-between px-3 py-5 text-lg gap-2">
                <div className={`text-gray-300 flex items-center gap-2`}>
                    <div className={`${bgColor} rounded-lg p-2`}>
                        <img src={icon} className="w-6" />
                    </div>
                    <div className="flex gap-1">
                        {title}
                        <span className="text-xs align-super">(mês)</span>
                    </div>
                </div>
                <div
                    className={`text-3xl place-self-end ${(Number(value) < 0) ? "text-red-600" : ""} 
                                ${title === "Despesas" ? "text-red-500" : "text-green-500"}`}>
                    € {Number(value).toFixed(2)}
                </div>
            </div>
        </div>
    )
}