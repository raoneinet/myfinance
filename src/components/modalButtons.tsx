type Props = {
    onClick: ()=>void
    cancel: string
    saveFinance: string
}

export const ModalButtons = ({onClick, cancel, saveFinance}: Props) => {
    return (
        <div className="w-full flex justify-between ">
            <input
                onClick={onClick} type="button" value={cancel}
                className="py-2 px-4 text-red-600 font-bold rounded-lg cursor-pointer" />
            <input
                type="submit" value={saveFinance}
                className="py-2 px-4 bg-gray-800 text-white font-bold rounded-lg cursor-pointer" />
        </div>
    )
}