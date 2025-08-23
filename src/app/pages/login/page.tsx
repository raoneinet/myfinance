"use client"
import LoginForm from "@/components/loginForm"
import { Header } from "@/views/header"
import GoToHomeButton from "@/components/goToHomeBtn"
import Link from "next/link"

const Login = () => {
    return (
        <>
            <Header />
            <div className="w-full h-screen flex justify-center items-center p-2 bg-gray-100">
                <div className="container h-full px-5 mx-auto flex flex-col">
                    <GoToHomeButton/>
                    <div className="mx-auto my-auto flex flex-col justify-center items-center p-5 w-2xl h-80 bg-white rounded-lg shadow shadow-gray-400">
                        <div>
                            <p>Faça login e gerencie suas finanças</p>
                        </div>
                        <LoginForm />
                        <div>
                            <p>Ainda não tem conta? {" "}<Link href="/pages/signup">Criar conta</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login