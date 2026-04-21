import "./App.css"
import {selectThemeMode, setIsLoggedIn} from "@/app/app-slice"
import {ErrorSnackbar, Header} from "@/common/components"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {Routing} from "@/common/routing"
import {getTheme} from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import {useMeQuery} from "@/features/auth/api/authApi";
import {useEffect, useState} from "react";


export const App = () => {

    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const { data, isFetching  } = useMeQuery()
    useEffect(() => {
        if (!isFetching) {
            if (data?.resultCode === 0) {
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
            }
        }
    }, [isFetching, data])

    const id = Symbol('id');
    console.log(id)

    //console.log(expires)
    return (
        <ThemeProvider theme={theme}>
            <div className={"app"}>
                <CssBaseline/>
                <Header/>
                <Routing/>
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}
