"use client"
import Link from "next/link"
import SignupForm from "@/components/signupForm"


const Signup = ()=>{
    return (
        <div className="w-full h-screen flex justify-center items-center p-2 bg-gray-100">
            <div className="flex flex-col justify-center items-center p-5 w-2xl h-80 bg-white rounded-lg shadow shadow-gray-400">
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
    )
}

export default Signup