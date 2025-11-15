"use client"
import Link from "next/link"

const SignInAndOutButtons = () => {
    return (
        <>
            <Link href="/auth/login" className="p-5">Login</Link>
            <Link href="/auth/register" className="p-5">Criar conta</Link>
        </>
    )
}

export default SignInAndOutButtons