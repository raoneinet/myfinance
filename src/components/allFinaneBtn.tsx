type Props = {
    allFinance: ()=>void
    getSalarySum: ()=>void
}

export const AllFinanceBtn = ({ allFinance, getSalarySum }: Props) => {

    const getAllFinance = () => {
        allFinance()
        getSalarySum()
    }
    return (
        <button
            type="button"
            onClick={getAllFinance}
            className="px-3 py-2 bg-neutral-700 hover:bg-neutral-800 text-center md:w-fit rounded-xl text-gray-50 cursor-pointer outline-0"
        >
            Todas as transações
        </button>
    )
}