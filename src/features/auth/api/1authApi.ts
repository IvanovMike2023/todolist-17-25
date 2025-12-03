
import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
export const loginApi = {
    authLogin(payload: BaseResponse) {
        return instance.post<BaseResponse <{ userId: string,captcha:string }>>(`/auth/login`,payload)
    },
    deleteLogin() {
        return instance.delete<BaseResponse>(`/auth/login`)
    },
    me() {
        return instance.get<BaseResponse <{id:number;email:string;login:string}>>(`/auth/me`)
    }
}
