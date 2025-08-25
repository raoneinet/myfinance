import { Auth } from "firebase/auth";

type Props = {
    auth: Auth
    router: any
    signOut: (auth: Auth) => void
    icon: string
}

const SignOutButton = ({ auth, router, signOut, icon }: Props) => {

    const handleSigntOut = async () => {
        try {
            await signOut(auth)
            router.push("/auth/login")
        } catch (error) {
            alert("Ocorreu um erro ao fazer Sign Out." + error)
        }
    }
    return (
        <div className="flex gap-1 w-fit cursor-pointer"
            onClick={handleSigntOut}>
            <button className="cursor-pointer"
            >Sair</button>
            <img src={icon} className="w-5 h-5 rounded-full" />
        </div>
    )
}

export default SignOutButton