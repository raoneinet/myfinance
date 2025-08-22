import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from "@/app/firebase"
import {TotalFinancing} from "./totalFinancing"

export const HomeDashboard = ()=>{

    const [user, loading, error] = useAuthState(auth)

    return (
        <div className="container h-full">
            <TotalFinancing/>
        </div>
    )
}