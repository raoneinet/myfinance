import { ReactNode } from "react"
import { useAuthContext } from "@/app/context/authContext"

export const SignedOut = ({children}: {children: ReactNode})=>{

    const {user, loading} = useAuthContext()

    if(loading || user) return null

    return <>{children}</>
}