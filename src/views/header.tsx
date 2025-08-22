"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from "@/app/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import SignOutButton from "@/components/signOutButton"

export const Header = ()=>{

    const router = useRouter()
    const [user] = useAuthState(auth)

    

    return (
        <header className="w-full px-2 py-3 bg-gray-900 h-20 text-white">
            <div className="container px-5 flex justify-between items-center h-full">
                <div>MyFinance</div>
                <div className="flex gap-3">
                    <div>{user?.email}</div>
                    <div>
                       <SignOutButton 
                            auth={auth} 
                            router={router} 
                            signOut={signOut}/>
                    </div>
                </div>
            </div>
        </header>
    )
}