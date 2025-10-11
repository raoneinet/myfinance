"use client"
import { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { LoginTypes } from "@/types/loginTypes"
import { UserType } from "@/types/userType"
import api from "../api/api"
import { loginAPI } from "@/services/auth"

type AuthContextType = {
    user: UserType | null;
    loading: boolean;
    login: (data: LoginTypes) => Promise<void>;
    logout: () => Promise<void>;
}
type Props = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const login = async ({ email, password }: LoginTypes) => {
        try {
            const res = await loginAPI({ email, password })
            setUser(res.data.user)
        } catch (error: any) {
            console.log("Erro ao fazer login: ", error.response.data || error.message)
            throw error
        }
    }

    const logout = async () => {
        setUser(null)
        try {
            await api.post("/logout.php")
        } catch (error: any) {
            console.warn("Erro ao deslogar no backend (provavelmente sessão expirada).")
            console.log("Erro ao fazer logout: ", error)
        }
    }

    useEffect(() => {
        api.get("/me.php")
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("Erro ao usar o useContext")
    }

    return context
}

