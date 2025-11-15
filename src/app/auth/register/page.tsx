"use client"
import Link from "next/link"
import SignupForm from "@/components/signupForm"
import { Header } from "@/views/header"
import GoToHomeButton from "@/components/buttons/goToHomeBtn"


const Signup = () => {
    return (
        <>
            <Header />
            <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center p-2 bg-gray-100">
                <div className="container h-full px-5 mx-auto flex flex-col">
                    <GoToHomeButton />
                    <div className="m-auto flex flex-col justify-center items-center p-5 w-2xl bg-white rounded-lg shadow shadow-gray-400">
                        <div className="text-center">
                            <h1 className="font-bold text-xl pb-4">Bem-vindo ao MyFinance</h1>
                            <p>Crie sua conta gratuitamente</p>
                            <p>Mantenha suas finanças atualizadas</p>
                        </div>
                        <SignupForm />
                        <div>
                            <p>Já tem conta? {" "}<Link href="/auth/login">Log in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup