"use client"
import Link from "next/link"
import SignupForm from "@/components/signupForm"
import { Header } from "@/views/header"
import GoToHomeButton from "@/components/goToHomeBtn"


const Signup = () => {
    return (
        <>
            <Header />
            <div className="w-full h-screen flex justify-center items-center p-2 bg-gray-100">
                <div className="container h-full px-5 mx-auto flex flex-col">
                    <GoToHomeButton />
                    <div className="m-auto flex flex-col justify-center items-center p-5 w-2xl h-80 bg-white rounded-lg shadow shadow-gray-400">
                        <div className="text-center">
                            <p>Crie sua conta gratuitamente</p>
                            <p>Mantenha suas finanças atualizadas</p>
                        </div>
                        <SignupForm />
                        <div>
                            <p>Já tem conta? {" "}<Link href="/pages/login">Log in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup