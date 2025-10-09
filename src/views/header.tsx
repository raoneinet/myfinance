"use client"
import SignInAndOutButtons from "@/components/signInandOutButtons"
import { useAuthContext } from "@/app/context/authContext"
import SignOutButton from "@/components/signOutButton"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect } from "react"

export const Header = () => {
    const router = useRouter()
    const { user, logout, loading } = useAuthContext()

    return (
        <header className="w-full px-2 py-3 bg-indigo-900 h-20 text-white">
            <div className="container mx-auto px-5 flex justify-between items-center h-full">
                <div className="font-bold text-xl">
                    <Link href="/">MyFinance</Link>
                </div>
                {!loading && user && (
                    <div className="flex gap-3 text-white">
                        <div>{user.fullname}</div>
                        <div>
                            <SignOutButton
                                router={router}
                                logout={logout}
                                icon="/assets/icons/signout.png" />
                        </div>
                    </div>
                )}
                {!user && !loading &&
                    <div>
                        <SignInAndOutButtons />
                    </div>}
            </div>
        </header>
    )
}