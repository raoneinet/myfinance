
type Props = {
    setModal: (arg: string)=>void
}
export const AddFinanceBtn = ({setModal}:Props)=>{

    const handleOpenTransactionModal = () => setModal("finance")

    return (
        <>
            <button onClick={handleOpenTransactionModal} name="finance"
                className="py-2 px-3 text-sm bg-gray-700 hover:bg-gray-500 text-white rounded-xl text-center cursor-pointer">
                <span className="text-2xl pr-2 align-middle">+</span> Adicionar transação
            </button>
        </>
    )
}