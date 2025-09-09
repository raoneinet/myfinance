
type Props = {
    title: string
    value: string
    color: string
}

export const TotalCards = ({title, value, color}: Props)=>{
    return (
        <div className={`${color} rounded-lg shadow shadow-gray-400`}>
            <div className="flex flex-col px-2 py-3">
                <div className={`font-bold`}>
                    {title} 
                    <span className="text-xs align-super">(mês)</span>
                </div>
                <div className={`${(Number(value) < 0) ? "text-red-600" : ""} ${title === "Despesas" ? "text-red-500":""}`}>€ {value}</div>
                <div></div>
            </div>
        </div>
    )
}