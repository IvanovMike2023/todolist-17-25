import "./App.css"
import {selectThemeMode, setIsLoggedIn} from "@/app/app-slice"
import {ErrorSnackbar, Header} from "@/common/components"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {Routing} from "@/common/routing"
import {getTheme} from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import React, {useEffect, useState} from "react";
import {useMeQuery} from "@/features/auth/api/_authApi";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)

    const { data, isLoading } = useMeQuery()
    useEffect(() => {
        if (!isLoading) {
            if (data?.resultCode === 0) {
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
            }
        }
    }, [isLoading, data])

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
