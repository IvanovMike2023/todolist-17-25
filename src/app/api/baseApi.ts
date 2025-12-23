import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AUTH_TOKEN} from "@/common/constants";
import {setAppErrorAC} from "@/app/app-slice";
import {isErrorWithMessage} from "@/common/utils/isErrorWithMessage";
import {ResultCode} from "@/common/enums";
import {handleError} from "@/common/utils/handleError";

export const baseApi = createApi({
    reducerPath: 'todolistsApi',
    tagTypes: ['Tasks', 'Todolist', 'Auth'],
    baseQuery: async (arg, api, extraOption) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: headers => {
                headers.set('API-KEY', `${import.meta.env.VITE_API_KEY}`)
                headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            }
        })
        (arg, api, extraOption)
        handleError(result,api)
        return result
    },
    endpoints: () => ({}),
})