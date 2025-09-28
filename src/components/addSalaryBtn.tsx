
export const AddSalaryBtn = ({setModal}: any) => {

    return (
        <>
            <button onClick={setModal} name="salary"
                className="py-2 px-3 text-sm bg-green-600 hover:bg-green-500 text-white rounded-xl text-center cursor-pointer">
                <span className="text-2xl pr-2 align-middle">+</span> Adicionar Salário
            </button>
        </>
    )
}