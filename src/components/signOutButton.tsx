import { Auth } from "firebase/auth";

type Props = {
    auth: Auth
    router: any;
    signOut: (auth:Auth)=>void
}

const SignOutButton = ({auth, router, signOut}: Props) => {

    const handleSigntOut = async () => {
        try {
            await signOut(auth)
            router.push("/pages/login")
        } catch (error) {
            alert("Ocorreu um erro ao fazer Sign Out." + error)
        }
    }
    return (
        <>
            <button className="cursor-pointer"
                onClick={handleSigntOut}>Sair</button>
        </>
    )
}

export default SignOutButton