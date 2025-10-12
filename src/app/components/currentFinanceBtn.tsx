
type Props = {
    currentFinance: ()=>void
}

export const CurrentFinanceBtn = ({currentFinance}: Props) => {
    const getCurrentFinance = ()=> {
        currentFinance()
    }
    return (
        <button
            type="button"
            onClick={getCurrentFinance}
            className="px-3 py-2 bg-gray-50 hover:bg-gray-300 text-center md:w-fit rounded-xl text-gray-600 cursor-pointer outline-0"
        >
            Atual
        </button>
    )
}

