"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { SignupTypes } from "@/types/signupTypes"
import {
    useCreateUserWithEmailAndPassword,
    useSendEmailVerification,
    useUpdateProfile
} from 'react-firebase-hooks/auth'
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import axios from "axios"
import jsSHA from "jssha"

const SignupForm = () => {

    const [confirmPassword, setConfirmPassword] = useState<boolean>(false)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<SignupTypes>()

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)
    const [sendEmailVerification] = useSendEmailVerification(auth)
    const [updateProfile] = useUpdateProfile(auth)

    const generateHash = ({ password }: any) => {
        let shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" })
        shaObj.update(password)
        return shaObj.getHash("HEX")
    }

    const handleSignUp: SubmitHandler<SignupTypes> = async (data) => {
        try {
            const password = data.password.trim() || ""
            const passwordConfirmation = data.passwordConfirmation.trim() || ""

            if (!password || !passwordConfirmation || password !== passwordConfirmation) {
                setConfirmPassword(true)
                return
            }

            const pwd_hash = generateHash({password})

            const userCredential = await createUserWithEmailAndPassword(data.email, data.password.trim())

            if (!userCredential) return null

            try {
                await axios.post("http://localhost/myfinance_backend/api/create_user.php",
                    {
                        fullname: data.name,
                        email: data.email,
                        password: pwd_hash
                    }
                )

                console.log("PHP DB: " + data.name + " Criado: " + new Date())

            } catch (err: any) {
                if (err.response) {
                    alert(err.response.data.error || "Erro ao cadastrar usuário");
                } else {
                    alert("Erro de conexão com o servidor");
                }
            }

            await updateProfile({
                displayName: data.name
            })

            await signOut(auth)
            await sendEmailVerification()

            router.push("/auth/login?verify=true")

            console.log("Usuário criado: " + userCredential.user.displayName)
            console.log(userCredential)
        } catch (error) {
            alert("Erro ao fazer cadastro." + error)
        }
    }

    return (
        <div className="p-5 bg-white">
            <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-2">
                <div>
                    <input type="name" {...register("name", { required: "Campo obrigatório" })}
                        className={`w-82 px-3 py-2 bg-gray-200 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        placeholder="Nome e sobrenome" />
                    {errors.name && <p className="text-xs">{errors.name.message}</p>}
                </div>
                <div>
                    <input type="email" {...register("email", { required: "Campo obrigatório" })}
                        className={`w-82 px-3 py-2 bg-gray-200 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        placeholder="Email" />
                    {errors.email && <p className="text-xs">{errors.email.message}</p>}
                </div>
                <div>
                    <input type="password" {...register("password", { required: "Campo obrigatório", min: 6, max: 20 })}
                        className={`w-82 px-3 py-2 bg-gray-200 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        placeholder="Senha" />
                    {errors.password && <p className="text-xs">{errors.password.message}</p>}
                </div>
                <div>
                    <input type="password" {...register("passwordConfirmation", { required: "Campo obrigatório", min: 6, max: 20 })}
                        className={`w-82 px-3 py-2 bg-gray-200 border ${(errors.passwordConfirmation || confirmPassword) ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        placeholder="Senha" />
                    {errors.passwordConfirmation && <p className="text-xs">{errors.passwordConfirmation.message}</p>}
                    {confirmPassword && <p className="text-xs">As senhas não são iguais</p>}
                </div>
                <div className="place-self-end">
                    <input
                        type="submit"
                        value="Criar conta"
                        className="w-fit px-3 py-2 bg-green-500 rounded-lg font-bold text-white cursor-pointer" />
                </div>
            </form>
        </div>
    )
}

export default SignupForm