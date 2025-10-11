import { ReactNode } from "react"
import { useAuthContext } from "@/app/context/authContext"

export const SignedIn = ({children}: {children: ReactNode})=>{

    const {user, loading} = useAuthContext()

    if(loading || !user) return null;

    if(!loading && !user) return <span>Sem acesso</span>;

    return <>{children}</>
}