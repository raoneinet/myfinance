export const ItemActionBox = ()=>{
    return (
        <div className="flex flex-col justify-center w-fit shadow shadow-gray-400  rounded-md mt-2 absolute bg-white">
            <div className="hover:bg-gray-100 w-full flex gap-2 cursor-pointer font-semibold px-4 py-2 ">
                <img src="/assets/icons/edit_icon.png" className="w-4 h-4"/>
                Editar
            </div>
            <div className="hover:bg-gray-100 flex gap-2 cursor-pointer font-semibold px-4 py-2">
                <img src="/assets/icons/delete_icon.png" className="w-4 h-4"/>
                Apagar
            </div>
        </div>
    )
}