import {baseApi} from "@/app/api/baseApi";
import {BaseResponse} from "@/common/types";
import {RequestLogin} from "@/features/auth/api/authApi.types";

export type AuthBaseResponse = BaseResponse & {
    load: string
}
export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
            query: () => `/auth/me`,
            providesTags: ['Auth']
        }),
        login: build.mutation< any, RequestLogin>({
            query: (body) => ({url: '/auth/login', method: 'POST', body}),
            invalidatesTags: ['Auth']
        }),
        logout: build.mutation<BaseResponse, void>({
            query: () => ({url: `/auth/login`, method: 'delete'}),
            invalidatesTags: ['Auth']
        })
    }),

})

export const {
    useMeQuery,
    useLoginMutation,
    useLogoutMutation
} = authApi