import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AUTH_TOKEN} from "@/common/constants";
export const baseApi = createApi({
    reducerPath: 'todolistsApi',
    tagTypes: ['Tasks','Todolist','Auth'],
    baseQuery:async (arg,api,extraOption)=>{
     await new Promise((resolve)=>setTimeout(resolve,200))
      return fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: headers => {
                headers.set('API-KEY', `${import.meta.env.VITE_API_KEY}`)
                headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            }
        })
    (arg,api,extraOption)},
    endpoints: () => ({}),
})