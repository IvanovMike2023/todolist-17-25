import {tasksApi} from "@/features/todolists/api/tasksApi"
import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice"
import { configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./app-slice.ts"
import {authReducer, authSlice} from "@/features/auth/model/auth-slice";
import {baseApi} from "@/app/api/baseApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: tasksApi.reducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
setupListeners(store.dispatch)