import api from "@/app/api/api"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const TableMenuOptions = ({id, setDeleteId, setEditFinance }: any) => {

    const deleteTransaction = () => {
        setDeleteId(id)
        console.log("este é o ID: ", id)
    }

    const editTransaction = async (id: number) => {
        try {
            const result = await api.get(`/single_finance.php?id=${id}`)
            setEditFinance(result.data)
            console.log("Editar o ID: ", id)
        } catch (error: any) {
            console.log("Ocorreu um erro ao editar a transação. ", error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                Opções
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <div
                        onClick={() => editTransaction(id)}
                        className="flex gap-2 cursor-pointer font-semibold">
                        <img src="/assets/icons/edit_icon.png" className="w-4 h-4" />
                        Editar
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div
                        onClick={() => deleteTransaction()}
                        className="flex gap-2 cursor-pointer font-semibold">
                        <img src="/assets/icons/delete_icon.png" className="w-4 h-4" />
                        Apagar
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
