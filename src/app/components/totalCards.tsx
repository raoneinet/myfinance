import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

type Props = {
    title: string
    value: number
    bgColor: string
    icon: string
    borderColor: string
}

export const TotalCards = ({ title, value, bgColor, icon, borderColor }: Props) => {

    const theme = useSelector((state: RootState)=>state.theme)

    const bgTheme = theme.themeStatus === "light" ? "bg-gray-800": "bg-white"
    const textTheme = theme.themeStatus === "light" ? "text-gray-400" : "text-gray-600"

    return (
        <div className={`${bgTheme} rounded-lg shadow shadow-gray-200 border-t-5 ${borderColor}`}>
            <div className="flex flex-col justify-between px-3 py-5 text-lg gap-2">
                <div className={`${textTheme} flex items-center gap-2`}>
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