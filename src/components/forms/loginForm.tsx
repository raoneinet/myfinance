"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuthContext } from "@/app/context/authContext"
import { LoginTypes } from "@/types/loginTypes"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


const LoginForm = () => {

    const router = useRouter()
    const { login } = useAuthContext()

    const formSchema = z.object({
        email: z.email("Email inválido ou incorreto"),
        password: z.string().min(6, {
            message: "A senha precisa ter no mínimo 6 caracteres"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleLogin: SubmitHandler<LoginTypes> = async (data) => {
        try {
            await login(data)
            router.push("/")

            console.log("Dados: ", data)

        } catch (error) {
            alert("Erro ao fazer login" + error)
        }

    }

    return (
        <div className="py-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Entrar</Button>
                </form>
            </Form>
        </div>
    )
}

export default LoginForm