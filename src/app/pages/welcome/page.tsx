import {HomeDashboard} from "../../views/homedashboard"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"


const WelcomePage = ()=>{

    const theme = useSelector((state: RootState) => state.theme)

    return (
        <div className={`w-full min-h-screen ${theme.themeStatus === "light" ? "bg-gray-800": "bg-indigo-50"}`}>
            <HomeDashboard/>
        </div>
    )
}

export default WelcomePage