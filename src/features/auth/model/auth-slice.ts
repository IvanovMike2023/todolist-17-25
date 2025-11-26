import {createAppSlice, handleServerAppError, handleServerNetworkError} from "@/common/utils";
import {LoginInputs} from "@/features/auth/lib/schemas";
import {setAppStatusAC} from "@/app/app-slice";
import {loginApi} from "@/features/auth/api/1authApi";
import {ResultCode} from "@/common/enums";
import {AUTH_TOKEN} from "@/common/constants";
import {string} from "zod";

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {
        login: ''
    },
    selectors: {
        getLogin: (state) => state.login
    },
    reducers: create => {
        return ({
            loginTC: create.asyncThunk(
                async (data: LoginInputs, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(setAppStatusAC({status: "loading"}))

                        const res = await loginApi.authLogin(data)
                        if (res.data.resultCode === ResultCode.Success) {
                            dispatch(setAppStatusAC({status: "succeeded"}))
                            localStorage.setItem(AUTH_TOKEN, res.data?.data.token);
                            return {isLoggedIn: true}
                        } else {
                            handleServerAppError(res.data, dispatch)
                            return rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.isLoggedIn = action.payload.isLoggedIn
                    },
                }
            ),
            logoutTC: create.asyncThunk(
                async (_, {dispatch, rejectWithValue}) => {

                    try {
                        const res = await loginApi.deleteLogin()
                        if (res.data.resultCode === ResultCode.Success) {
                            dispatch(setAppStatusAC({status: "succeeded"}))
                            localStorage.removeItem(AUTH_TOKEN);
                            return {isLoggedIn: false}
                        } else {
                            handleServerAppError(res.data, dispatch)
                            return rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.isLoggedIn = action.payload.isLoggedIn
                    },
                }
            ),
            meTC: create.asyncThunk(
                async (_, {dispatch, rejectWithValue}) => {
                    try {
                        const res = await loginApi.me()
                        if (res.data.resultCode === ResultCode.Success) {
                            dispatch(setAppStatusAC({status: "succeeded"}))
                            return {isLoggedIn: true,login:res.data.data.login}
                        } else {
                            handleServerAppError(res.data, dispatch)
                            return rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.isLoggedIn = action.payload.isLoggedIn
                        state.login = action.payload.login
                    },
                }
            )
        });
    },
})

export const {selectIsLoggedIn,getLogin} = authSlice.selectors
export const {loginTC, logoutTC, meTC} = authSlice.actions
export const authReducer = authSlice.reducer
