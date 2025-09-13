export const ItemActionBox = ()=>{
    return (
        <div className="flex flex-col justify-center w-fit shadow shadow-gray-400 px-4 py-3 rounded-md mt-2 absolute bg-white">
            <div className="flex gap-2 cursor-pointer font-semibold">
                <img src="/assets/icons/edit_icon.png" className="w-4 h-4"/>
                Editar
            </div>
            <div className="flex gap-2 cursor-pointer font-semibold">
                <img src="/assets/icons/delete_icon.png" className="w-4 h-4"/>
                Apagar
            </div>
        </div>
    )
}