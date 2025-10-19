"use client"
import WelcomePage from "../welcome/page"
import { SignedIn } from "@/app/components/signedin"
import { SignedOut } from "@/app/components/signedout"
import { LoadingSpinner } from "@/app/components/loadingSpinner"
import { useAuthContext } from "@/app/context/authContext"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const PageContent = () => {

    const { user, loading } = useAuthContext()
    const theme = useSelector((state: RootState) => state.theme)

    if (loading) return <LoadingSpinner />

    return (
        <div 
            className={`w-full min-h-screen ${theme.themeStatus === "light" ? "bg-gray-800": "bg-indigo-50"}`} 
        >
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