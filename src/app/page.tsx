"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"
import { WelcomePage } from "./pages/welcome/welcome"
import { SignedIn } from "@/components/signedin"
import { SignedOut } from "@/components/signedout"
import SignInAndOutButtons from "@/components/signInandOutButtons"
import { Header } from "@/views/header"

const Page = () => {
  const [user, loading, error] = useAuthState(auth)
  return (
    <>
      <Header />
      <div className="w-full h-screen">
        {user &&
          <SignedIn>
            <WelcomePage />
          </SignedIn>
        }
        {!user &&
          <SignedOut>
            <SignInAndOutButtons />
          </SignedOut>
        }
      </div>
    </>
  )
}

export default Page