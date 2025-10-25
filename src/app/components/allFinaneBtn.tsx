type Props = {
    allFinance: ()=>void
    getSalarySum: ()=>void
    btnThemeBg: any
}

export const AllFinanceBtn = ({ btnThemeBg, allFinance, getSalarySum }: Props) => {

    const getAllFinance = () => {
        allFinance()
        //getSalarySum()
    }
    return (
        <button
            type="button"
            onClick={getAllFinance}
            className={`px-3 py-2 hover:bg-gray-300 text-center md:w-fit rounded-xl text-gray-800 cursor-pointer outline-0 ${btnThemeBg}`}
        >
            Todas as transações
        </button>
    )
}