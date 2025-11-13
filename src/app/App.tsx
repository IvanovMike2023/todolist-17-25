import "./App.css"
import {selectAppStatus, selectThemeMode, setAppStatusAC} from "@/app/app-slice"
import {ErrorSnackbar, Header, PageNotFound} from "@/common/components"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {Path, Routing} from "@/common/routing"
import {getTheme} from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import {useEffect, useState} from "react";
import {meTC, selectIsLoggedIn} from "@/features/auth/model/auth-slice";
import {Navigate} from "react-router";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
  const [init,setInit]=useState(false)
    useEffect(() => {
        dispatch(meTC()).unwrap()
            .finally(()=>{
            setInit(true)
        })
    }, [])
    console.log(init)
  if(!init){
   return <h1>cs</h1>
  }
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
