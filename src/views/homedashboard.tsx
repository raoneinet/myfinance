import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from "@/app/firebase"

export const HomeDashboard = ()=>{

    const [user, loading, error] = useAuthState(auth)

    return (
        <div className="container h-full">
            <h1>Welcome to {user?.email}</h1>
        </div>
    )
}