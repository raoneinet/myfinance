"use client"
import Link from "next/link"

const SignInAndOutButtons = () => {
    return (
        <>
            <Link href="/pages/login" className="p-5">Login</Link>
            <Link href="/pages/signup" className="p-5">Criar conta</Link>
        </>
    )
}

export default SignInAndOutButtons