"use client"
import { createContext, useContext, ReactNode} from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { User } from "firebase/auth"
import {auth} from "@/app/firebase"

type AuthContextType = {
    user: User | null | undefined;
    loading: boolean;
    error?: Error
}
type Props = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: Props)=>{
    const [user, loading, error] = useAuthState(auth)

    return (
        <AuthContext.Provider value={{user, loading, error}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = ()=>{
    const context = useContext(AuthContext)

    if(context === undefined){
        throw new Error("Erro ao usar o useContext")
    }

    return context
}

