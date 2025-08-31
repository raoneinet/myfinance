"use client"
import { useState, useEffect } from "react"
import { SignedOut } from "@/components/signedout"
import Login from "../../auth/login/page"
import { useAuthContext } from "@/app/context/authContext"

export const SignOutPage = () => {

    const [loading, setLoading] = useState(document.readyState === "loading")
    const {user}= useAuthContext()

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