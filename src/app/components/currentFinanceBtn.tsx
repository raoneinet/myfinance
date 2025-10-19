
type Props = {
    currentFinance: ()=>void
    btnThemeBg: any
}

export const CurrentFinanceBtn = ({btnThemeBg, currentFinance}: Props) => {
    const getCurrentFinance = ()=> {
        currentFinance()
    }
    return (
        <button
            type="button"
            onClick={getCurrentFinance}
            className={`px-3 py-2 hover:bg-gray-300 text-center md:w-fit rounded-xl text-gray-800 cursor-pointer outline-0 ${btnThemeBg}`}
        >
            Atual
        </button>
    )
}

