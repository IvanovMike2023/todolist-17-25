
import {baseApi} from "@/app/api/baseApi";
import {BaseResponse} from "@/common/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
            query: () => `/auth/me`,
           // providesTags: ['Auth']
        }),
        login: build.mutation< any , any>({
            query: (body) => ({url: '/auth/login', method: 'POST', body}),
            invalidatesTags: ['Auth']
        }),
        logout: build.mutation<void, void>({
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