import { useDispatch } from "react-redux"
import { setTheme } from "@/redux/reducers/themeReducer"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export const ChangeThemeBtn = () => {

    const dispatch = useDispatch()

    const theme = useSelector((state: RootState) => state.theme)

    const switchTheme = (newTheme: string) => dispatch(setTheme(newTheme))

    const handleThemeChange = () => {
        switchTheme(theme.themeStatus === "light" ? "dark" : "light")
        console.log(theme.themeStatus)
    }

    return (
        <div>
            <div
                onClick={handleThemeChange}
                className={`w-3 h-3 rounded-full cursor-pointer 
                    ${theme.themeStatus === "light" ? "bg-gray-50" : "bg-gray-500"}`}
            >
            </div>
        </div>
    )
}