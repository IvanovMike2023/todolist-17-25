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
    type Pokemon={
        name:string,
        url:string
    }
    const usePokemons=()=>{
        const  [name,setName]=useState('')
        const getPokemon=async (name:string)=>{
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
            const data=await res.json()
            console.log(data.results.filter((f:Pokemon)=>f.name===name))
      return  setName(data.results.filter((f:Pokemon)=>f.name===name)[0].name)
        }
        return {name,getPokemon}
    }
    const {name,getPokemon}=usePokemons()
    console.log(name)
    //getPokemon('bulbasaur')
    useEffect(()=>{
        getPokemon('bulbasaur')
    },[])
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
