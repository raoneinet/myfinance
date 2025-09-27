
export const AddSalaryBtn = ({setModal}: any) => {

    return (
        <>
            <button onClick={setModal} name="salary"
                className="py-2 px-3 bg-green-500 text-white rounded-lg text-center cursor-pointer">
                <span className="text-2xl pr-2 align-middle">+</span> Adicionar Salário
            </button>
        </>
    )
}