
type Props = {
    title: string
    value: string
    color: string
}

export const TotalCards = ({title, value, color}: Props)=>{
    return (
        <div className={`${color} rounded-lg shadow shadow-gray-600`}>
            <div className="flex flex-col px-2 py-3">
                <div className=" text-gray-800 font-bold">
                    {title} 
                    <span className="text-xs align-super">(mês)</span>
                </div>
                <div className={`${(Number(value) < 0) ? "text-red-600" : ""}`}>€ {value}</div>
                <div></div>
            </div>
        </div>
    )
}