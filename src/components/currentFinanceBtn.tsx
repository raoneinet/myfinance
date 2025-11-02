
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
            className="px-3 py-2 bg-neutral-700 hover:bg-neutral-800text-center md:w-fit rounded-xl text-gray-50 cursor-pointer outline-0"
        >
            Atual
        </button>
    )
}

