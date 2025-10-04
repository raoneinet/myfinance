export const AllFinanceBtn = ({allFinance}: {allFinance: ()=>void}) => {

    const getAllFinance = ()=> allFinance()
    return (
        <button
            type="button"
            onClick={getAllFinance}
            className="px-3 py-2 bg-gray-50 hover:bg-gray-300 text-center md:w-fit rounded-xl text-gray-600 cursor-pointer outline-0"
        >
                Todas as transações
        </button>
    )
}