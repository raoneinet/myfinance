import { useForm, SubmitHandler } from "react-hook-form"
import { SignupTypes } from "@/types/signupTypes"

export const SignupForm = ()=>{

    const {register, handleSubmit, formState:{errors}} = useForm<SignupTypes>()
    const handleSignUp: SubmitHandler<SignupTypes> = (data)=>{
        console.log(data)
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
                    <input type="submit" value="Log in" className="w-fit px-3 py-2 bg-green-500 rounded-lg font-bold text-white cursor-pointer"/>
                </div>
            </form>
        </div>
    )
}