"use client"
import { useState, useEffect } from "react"
import { SignedOut } from "@/components/signedout"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase"
import Login from "../../auth/login/page"

export const SignOutPage = () => {

    const [loading, setLoading] = useState(document.readyState === "loading")
    const [user, error] = useAuthState(auth)

    useEffect(() => {
        function handleStateChange() {
            setLoading(document.readyState === "loading")
        }

        document.addEventListener("readystatechange", handleStateChange)

        if (document.readyState === "complete") {
            setLoading(false)
        }
    }, [])
    return (
        <>
            {
                !user && !loading &&
                <SignedOut>
                    <Login/>
                </SignedOut>
            }
        </>
    )
}