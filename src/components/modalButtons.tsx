type Props = {
    //onClick: ()=>void
    leftBtn: string
    rightBtn: string
    handleCancel: ()=>void
    handleConfirm?: ()=>void
}

export const ModalButtons = ({leftBtn, rightBtn, handleCancel, handleConfirm}: Props) => {
    return (
        <div className="w-full flex justify-between ">
            <input
                type="button" value={leftBtn}
                onClick={handleCancel}
                className="py-2 px-4 text-red-600 font-bold rounded-lg cursor-pointer" />
            <input
                type="submit" value={rightBtn}
                onClick={handleConfirm}
                className="py-2 px-4 bg-gray-800 text-white font-bold rounded-lg cursor-pointer" />
        </div>
    )
}