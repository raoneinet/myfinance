
export const AddFinanceBtn = ({setModal}:any)=>{

    return (
        <>
            <button onClick={setModal} name="finance"
                className="py-2 px-3 text-sm bg-gray-700 hover:bg-gray-500 text-white rounded-xl text-center cursor-pointer">
                <span className="text-2xl pr-2 align-middle">+</span> Adicionar Movimento
            </button>
        </>
    )
}