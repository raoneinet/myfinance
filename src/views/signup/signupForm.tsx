import { useForm, SubmitHandler } from "react-hook-form"
import { SignupTypes } from "@/types/signupTypes"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from "@/app/fisebase"

export const SignupForm = ()=>{

    const {register, handleSubmit, formState:{errors}} = useForm<SignupTypes>()

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

    const handleSignUp: SubmitHandler<SignupTypes> = (data)=>{
        try {
            createUserWithEmailAndPassword(data.email, data.password)
        }catch(erro){

        }
    }

    return (
        <div className="p-5 bg-white">
            <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-2">
                <div>
                    <input type="email" {...register("email")}
                        className="w-82 px-3 py-2 bg-gray-200 border border-gray-300 rounded-lg"
                        placeholder="Email"/>
                </div>
                <div>
                    <input type="password" {...register("password")}
                        className="w-82 px-3 py-2 bg-gray-200 border border-gray-300 rounded-lg"
                        placeholder="Senha"/>
                </div>
                <div className="place-self-end">
                    <input type="submit" value="Criar conta" className="w-fit px-3 py-2 bg-green-500 rounded-lg font-bold text-white cursor-pointer"/>
                </div>
            </form>
        </div>
    )
}