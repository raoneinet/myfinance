import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditFinanceModal } from "./editFinanceModal"
import { ModalDeleteConfirmation } from "./modalDeleteConfirmation"

export const TableMenuOptions = ({finance, id}: any) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Opções</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    ...
                </DropdownMenuItem>
                <DropdownMenuItem>
                    ...
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
