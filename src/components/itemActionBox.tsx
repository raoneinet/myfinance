import api from "@/app/api/api"

type Props = {
    handleUpdateAll: ()=>void
    id: any
}

export const ItemActionBox = ({id, handleUpdateAll}: Props)=>{

    const deleteTransaction = async (id: number)=>{
        try {
            await api.post("/delete_finance_item.php", {id})
            console.log("Movimento apagado: ", id)
            handleUpdateAll()
        }catch(error: any){
            console.log("Error ao apagar movimento: ", error)
        }
    }

    return (
        <div className="flex flex-col justify-center w-fit shadow shadow-gray-400 rounded-md mt-2 absolute bg-white -ml-20">
            <div className="hover:bg-gray-100 w-full flex gap-2 cursor-pointer font-semibold px-4 py-2 ">
                <img src="/assets/icons/edit_icon.png" className="w-4 h-4"/>
                Editar
            </div>
            <div
                onClick={()=>deleteTransaction(id)} 
                className="hover:bg-gray-100 flex gap-2 cursor-pointer font-semibold px-4 py-2">
                <img src="/assets/icons/delete_icon.png" className="w-4 h-4"/>
                Apagar
            </div>
        </div>
    )
}