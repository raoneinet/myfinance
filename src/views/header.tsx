"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import SignOutButton from "@/components/signOutButton"
import SignInAndOutButtons from "@/components/signInandOutButtons"
import Link from "next/link"

export const Header = () => {

    const router = useRouter()
    const [user] = useAuthState(auth)



    return (
        <header className="w-full px-2 py-3 bg-black h-20 text-white">
            <div className="container mx-auto px-5 flex justify-between items-center h-full">
                <div><Link href="/">MyFinance</Link></div>
                {user &&
                    <div className="flex gap-3">
                        <div>{user?.displayName}</div>
                        <div>
                            <SignOutButton
                                auth={auth}
                                router={router}
                                signOut={signOut} 
                                icon="/assets/icons/signout.jpg"/>
                        </div>
                    </div>
                }
                {!user &&
                <div>
                    <SignInAndOutButtons />
                </div>}
            </div>
        </header>
    )
}