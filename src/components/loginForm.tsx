"use client"
import {useForm, SubmitHandler} from "react-hook-form"
import {LoginTypes} from "@/types/loginTypes"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/app/fisebase"
import { useRouter } from "next/navigation"

export const LoginForm = ()=>{

    const router = useRouter()
    const {register, handleSubmit, formState:{errors}} = useForm<LoginTypes>()
    const [signInWithEmailAndPassword, user] = useSignInWithEmailAndPassword(auth)

    const handleLogin:SubmitHandler<LoginTypes> = async (data)=>{
        try{
            await signInWithEmailAndPassword(data.email, data.password)
            router.push("/")
            console.log(user)
        }catch(error){
            alert("Erro ao fazer login" + error)
        }

    }

    return (
        <div className="p-5 bg-white">
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-2">
                <div>
                    <input type="email" {...register("email", {required: "Campo obrigatório"})}
                        className={`w-82 px-3 py-2 bg-gray-200 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        placeholder="Email"/>
                        {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <input type="password" {...register("password", {required: "Campo obrigatório", min: 6, max: 20})}
                        className={`w-82 px-3 py-2 bg-gray-200 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        placeholder="Senha"/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="place-self-end">
                    <input type="submit" value="Entrar" className="w-fit px-3 py-2 bg-green-500 rounded-lg font-bold text-white cursor-pointer"/>
                </div>
            </form>
        </div>
    )
}