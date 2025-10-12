import { ModalButtons } from "./modalButtons"

export const ModalAddSalary = ({ closeModal, register, handleSubmit, handleInsertSalary, errors }: any) => {

    return (
        <div className="shadow shadow-gray-700 p-4 bg-white rounded-lg w-fit px-6">
            <div className="border-b border-gray-200 mb-3">
                <p className="py-3">Adicionar sálario</p>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(handleInsertSalary)}
                    className="flex flex-col gap-5 justify-between py-5"
                >
                    <div className="flex flex-col md:flex-row gap-2">
                        <input type="number"
                            {...register("salary_amount", { required: true })}
                            className="flex-1 p-2 border border-gray-300 rounded-lg"
                            placeholder="Valor" />
                        <input
                            {...register("salary_desc", { required: true })}
                            className="flex-1 p-2 border border-gray-300 rounded-lg"
                            placeholder="Descrição" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <input
                            {...register("salary_company", { required: true })}
                            className="flex1 p-2 border border-gray-300 rounded-lg"
                            placeholder="Empresa" />
                        <input
                            type="date" {...register("payment_date", { required: true })}
                            className="p-2 flex-1 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="">
                        <ModalButtons
                            handleCancel={closeModal}
                            leftBtn="Cancelar"
                            rightBtn="Adicionar"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}