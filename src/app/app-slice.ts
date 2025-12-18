import type {RequestStatus} from "@/common/types"
import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit"
import {todolistApi} from "@/features/todolists/api/todolistsApi";
import {tasksApi} from "@/features/todolists/api/tasksApi";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: "light" as ThemeMode,
        status: "idle" as RequestStatus,
        error: null as string | null,
        isLoggedIn: false,
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectAppStatus: (state) => state.status,
        selectAppError: (state) => state.error,
        selectisLoggedIn: (state) => state.isLoggedIn,
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
        setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
    }),
    extraReducers: (bilder) => {
        bilder
            .addMatcher(isPending
                , (state, action) => {
                    if (todolistApi.endpoints.getTodolists.matchPending(action) ||
                        tasksApi.endpoints.getTask.matchPending(action)) {
                        return
                    }
                    state.status = 'loading'
                })
            .addMatcher(isFulfilled
                , (state, action) => {
                    state.status = 'idle'
                })
            .addMatcher(isRejected
                , (state, action) => {
                    state.status = 'failed'
                })
    }
})

export const {selectThemeMode, selectAppStatus, selectAppError, selectisLoggedIn} = appSlice.selectors
export const {changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedIn} = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
