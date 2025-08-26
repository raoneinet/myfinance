"use client"
import SignInAndOutButtons from "@/components/signInandOutButtons"
import Link from "next/link"
import { useAuthContext } from "@/app/context/authContext"
import SignOutButton from "@/components/signOutButton"
import { auth } from "@/app/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"


export const Header = () => {
    const router = useRouter()
    const { user, loading } = useAuthContext()



    return (
        <header className="w-full px-2 py-3 bg-black h-20 text-white">
            <div className="container mx-auto px-5 flex justify-between items-center h-full">
                <div><Link href="/">MyFinance</Link></div>
                {user && !loading &&
                    <div className="flex gap-3 text-white">
                        <div>{user?.displayName}</div>
                        <div>
                            <SignOutButton
                                auth={auth}
                                router={router}
                                signOut={signOut}
                                icon="/assets/icons/signout.jpg" />
                        </div>
                    </div>
                }
                {!user && !loading &&
                    <div>
                        <SignInAndOutButtons />
                    </div>}
            </div>
        </header>
    )
}