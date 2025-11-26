import "./App.css"
import {selectThemeMode, setIsLoggedIn} from "@/app/app-slice"
import {ErrorSnackbar, Header} from "@/common/components"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {Routing} from "@/common/routing"
import {getTheme} from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import {useEffect, useState} from "react";
import {meTC, selectIsLoggedIn} from "@/features/auth/model/auth-slice";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {useMeQuery} from "@/features/auth/api/_authApi";


export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    //const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const [init, setInit] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)


    const { data, isLoading } = useMeQuery()
    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true)
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
