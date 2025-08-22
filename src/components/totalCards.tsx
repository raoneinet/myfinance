
type Props = {
    title: string
    value: string
}

export const TotalCards = ({title, value}: Props)=>{
    return (
        <div className="bg-white rounded-lg">
            <div className="flex flex-col px-2 py-3">
                <div className="text-lg text-gray-700">
                    {title} 
                    <span className="text-xs align-super">(mês)</span>
                </div>
                <div>{value} €</div>
                <div></div>
            </div>
        </div>
    )
}