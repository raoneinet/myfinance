"use client"
import { Header } from "@/views/header"
import PageContent from "./pages/pageContent/page"
import { useAuthContext } from "./context/authContext"
import { LoadingSpinner } from "@/components/loading/loadingSpinner"

const Page = () => {

  const {loading} = useAuthContext()

  if (loading) return <LoadingSpinner />

  return (
    <>
      <Header />
      <PageContent />
    </>
  )
}

export default Page