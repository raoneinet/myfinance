import api from "@/app/api/api"
import { UserType } from "@/types/userType";

export interface LoginResponse {
    data: {
        message: string;
        user: UserType;
    };
}

export const loginAPI = async ({ email, password }: { email: string; password: string; }): Promise<LoginResponse> => {
    try {
        const res = await api.post("/login_user.php",
            {
                email,
                password        
            }
        )

        if(res.data.error) {
            throw new Error(res.data.error);
        }

        if(!res.data.user) {
            throw new Error("Resposta inválida do servidor: usuário não encontrado.");
        }

        if(res.status !== 200) {
            throw new Error("Erro ao fazer login: " + (res.data.message || res.statusText));
        }

        return res;
    } catch (error: any) {
        console.log("Erro ao fazer login: ", error.response.data || error.message)
        throw error
    }
}