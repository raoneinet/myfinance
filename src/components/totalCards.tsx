
type Props = {
    title: string
    value: string
    color: string
}

export const TotalCards = ({title, value, color}: Props)=>{
    return (
        <div className={`${color} rounded-lg`}>
            <div className="flex flex-col px-2 py-3">
                <div className="text-lg text-gray-700 font-bold">
                    {title} 
                    <span className="text-xs align-super">(mês)</span>
                </div>
                <div>{value} €</div>
                <div></div>
            </div>
        </div>
    )
}