import {createAppSlice, handleServerAppError, handleServerNetworkError} from "@/common/utils";
import {LoginInputs} from "@/features/auth/lib/schemas";
import {setAppStatusAC} from "@/app/app-slice";
import {loginApi} from "@/features/auth/api/authApi";
import {ResultCode} from "@/common/enums";
import {AUTH_TOKEN} from "@/common/constants";

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn,
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
        });
    },
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC } = authSlice.actions
export const authReducer = authSlice.reducer
