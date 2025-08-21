import { ReactNode } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../app/fisebase"

export const SignedOut = ({children}: {children: ReactNode})=>{

    const [user] = useAuthState(auth)

    if(user) return null

    return <>{children}</>
}