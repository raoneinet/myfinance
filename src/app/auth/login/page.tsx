"use client"
import LoginForm from "@/components/forms/loginForm"
import { Header } from "@/views/header"
import GoToHomeButton from "@/components/buttons/goToHomeBtn"
import Link from "next/link"

const Login = () => {
    return (
        <>
            <Header />
            <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center p-2 bg-gray-100">
                <div className="container h-full px-5 mx-auto flex flex-col">
                    <GoToHomeButton />
                    <div className="mx-auto my-auto flex flex-col justify-center items-center p-5 w-2xl h-fit bg-white rounded-lg shadow shadow-gray-400">
                        <div className="pb-5">
                            <h1 className="font-bold text-xl pb-2">Bem-vindo ao MyFinance</h1>
                            <p>Faça login e gerencie suas finanças</p>
                        </div>
                        <LoginForm />
                        <div className="text-sm pt-5 flex gap-2">
                            <p>Ainda não tem conta?</p>
                            <Link className="underline text-neutral-400" href="/auth/register">Criar conta</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login