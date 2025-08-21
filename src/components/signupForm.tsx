"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { SignupTypes } from "@/types/signupTypes"
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from 'react-firebase-hooks/auth'
import { auth } from "@/app/fisebase"
import { useRouter } from "next/navigation"

export const SignupForm = ()=>{

    const router = useRouter()
    const {register, handleSubmit, formState:{errors}} = useForm<SignupTypes>()

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)
    const [sendEmailVerification] = useSendEmailVerification(auth)

    const handleSignUp: SubmitHandler<SignupTypes> = async (data)=>{
        try {
            await createUserWithEmailAndPassword(data.email, data.password)
            await sendEmailVerification()
            router.push("/views/login")
            console.log(user)
        }catch(error){
            alert("Erro ao fazer cadastro." + error)
        }
    }

    return (
        <div className="p-5 bg-white">
            <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-2">
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
                    <input type="submit" value="Criar conta" className="w-fit px-3 py-2 bg-green-500 rounded-lg font-bold text-white cursor-pointer"/>
                </div>
            </form>
        </div>
    )
}