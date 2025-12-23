import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AUTH_TOKEN} from "@/common/constants";
import {setAppErrorAC} from "@/app/app-slice";
import {isErrorWithMessage} from "@/common/utils/isErrorWithMessage";
import {ResultCode} from "@/common/enums";

export const baseApi = createApi({
    reducerPath: 'todolistsApi',
    tagTypes: ['Tasks', 'Todolist', 'Auth'],
    baseQuery: async (arg, api, extraOption) => {
        // await new Promise((resolve) => setTimeout(resolve, 200))
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: headers => {
                headers.set('API-KEY', `${import.meta.env.VITE_API_KEY}`)
                headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            }
        })
        (arg, api, extraOption)
        let error = 'Some error occurred'
        if (result.error) {
            switch (result.error.status) {
                case 'FETCH_ERROR':
                case  'PARSING_ERROR':
                case  'CUSTOM_ERROR':
                case  'TIMEOUT_ERROR':
                    error: result.error.error
                    break
                case 403:
                    error = '403 Forbidden Error. Check API-KEY'
                    break
                case  400:
                    if (isErrorWithMessage(result.error.data)) {
                        error = result.error.data.message
                    } else {
                        error = JSON.stringify(result.error.data)
                    }
                    break
                default:
                    if (result.error.status >= 500 && result.error.status < 600) {
                        error = 'Server error occurred. Please try again later.'
                    }
                    else {
                        error = JSON.stringify(result.error)
                    }
                    break
            }
            api.dispatch(setAppErrorAC({error}))
        }
        if((result.data as { resultCode:ResultCode }).resultCode===ResultCode.Error){
            const message=(result.data as {messages:string[0]}).messages
            error=message.length ? message[0] : error
            api.dispatch(setAppErrorAC({error}))
        }
        return result
    },
    endpoints: () => ({}),
})