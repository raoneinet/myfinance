"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from "./fisebase"
import { WelcomePage } from "./views/welcome/welcome"
import { SignedIn } from "../components/signedin"
import { SignedOut } from "../components/signedout"
import {SignInAndOutButtons} from "@/components/signInandOutButtons"

const Page = ()=>{
  const [user, loading, error] = useAuthState(auth)
  return (
    <div className="w-full h-screen">
      <SignedIn>
        <WelcomePage/>
      </SignedIn>
      <SignedOut>
        <SignInAndOutButtons/>
      </SignedOut>
    </div>
  )
}

export default Page