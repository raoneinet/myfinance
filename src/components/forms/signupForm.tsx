"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { SignupTypes } from "@/types/signupTypes"
import { useRouter } from "next/navigation"
import api from "@/app/api/api"
import jsSHA from "jssha"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const SignupForm = () => {

    const [confirmPassword, setConfirmPassword] = useState<boolean>(false)
    const router = useRouter()

    const formSchema = z.object({
        fullname: z.string().min(2, { message: "Nome precisa pelo menos de 2 caracteres" }),
        email: z.email("Email inválido"),
        password: z.string().min(6, { message: "Senha precisa pelo menos 6 caracteres" }),
        passwordConfirmation: z.string().min(2, { message: "Senhas precisam ser iguais" })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        }
    })

    const generateHash = ({ password }: { password: string }) => {
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

            const pwd_hash = generateHash({ password })

            try {
                await api.post("/create_user.php",
                    {
                        fullname: data.fullname,
                        email: data.email,
                        password: data.password
                    }
                )

                console.log("PHP DB: " + data.fullname + " Criado: " + new Date())

            } catch (err: any) {
                if (err.response) {
                    alert(err.response.data.error || "Erro ao cadastrar usuário");
                } else {
                    alert("Erro de conexão com o servidor");
                }
            }

            router.push("/auth/login?verify=true")

        } catch (error) {
            alert("Erro ao fazer cadastro." + error)
        }
    }

    return (
        <div className="p-5 bg-white">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome Completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Smith" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="exemplo@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirmar senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Enviar</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignupForm