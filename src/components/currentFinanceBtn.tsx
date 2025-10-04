
export const CurrentFinanceBtn = ({currentFinance}: {currentFinance: ()=>void}) => {
    const getCurrentFinance = ()=> currentFinance() 
    return (
        <input
            type="button"
            onClick={getCurrentFinance}
            className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-300 text-center md:w-fit rounded-xl text-gray-600 cursor-pointer outline-0"
            value="Atual" />
    )
}

