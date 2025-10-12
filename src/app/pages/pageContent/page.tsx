"use client"
import WelcomePage from "../welcome/page"
import { SignedIn } from "@/app/components/signedin"
import { SignedOut } from "@/app/components/signedout"
import { LoadingSpinner } from "@/app/components/loadingSpinner"
import { useAuthContext } from "@/app/context/authContext"

const PageContent = () => {
    const { user, loading } = useAuthContext()

    if (loading) return <LoadingSpinner />

    return (
        <div className="w-full h-screen bg-indigo-50">
            {!loading && user &&
                <SignedIn>
                    <WelcomePage />
                </SignedIn>
            }
            {!user &&
                <SignedOut>
                    <div className="container mx-auto">
                        <div>Devo construir uma LP ou página de apresentação.</div>
                    </div>
                </SignedOut>
            }
        </div>
    )
}

export default PageContent