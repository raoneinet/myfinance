
type Props = {
    router: any
    logout: () => Promise<void>
    icon: string
}

const SignOutButton = ({router, logout, icon }: Props) => {

    const handleLogout = async () => {
        try {
            await logout()
            router.push("/auth/login")
        } catch (error) {
            alert("Ocorreu um erro ao fazer Sign Out." + error)
        }
    }
    return (
        <div className="flex gap-1 w-fit cursor-pointer" onClick={handleLogout}>
            <button className="cursor-pointer">Sair</button>
            <img src={icon} className="w-5 h-5 rounded-full" />
        </div>
    )
}

export default SignOutButton