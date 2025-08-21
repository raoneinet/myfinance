
import {SignupForm} from "./signupForm"


export const Signup = ()=>{

    return (
        <div className="w-full h-full flex justify-center items-center p-2 bg-gray-100">
            <div className="flex justify-center items-center p-5 w-2xl h-80 bg-white rounded-lg shadow shadow-gray-400">
                <SignupForm />
            </div>
        </div>
    )
}