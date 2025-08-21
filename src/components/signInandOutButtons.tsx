import Link from "next/link"

export const SignInAndOutButtons = () => {
    return (
        <>
            <Link href="/views/login" className="p-5">Login</Link>
            <Link href="/views/signup" className="p-5">Criar conta</Link>
        </>
    )
}