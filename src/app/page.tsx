"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"
import WelcomePage from "./pages/welcome/page"
import { SignedIn } from "@/components/signedin"
import { SignedOut } from "@/components/signedout"
import { Header } from "@/views/header"
import { AuthProvider } from "./context/authContext"
import { LoadingSpinner } from "@/components/loadingSpinner"

const Page = () => {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen">
        {user && !loading &&
          <SignedIn>
            <WelcomePage />
          </SignedIn>
        }
        {!user &&
          <SignedOut>
            <div className="container mx-auto f-fulll">
              <div>Devo construir uma LP ou página de apresentação.</div>
            </div>
          </SignedOut>
        }
      </div>
    </AuthProvider>
  )
}

export default Page