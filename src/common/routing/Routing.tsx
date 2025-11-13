import {Main} from "@/app/Main"
import {PageNotFound} from "@/common/components"
import {Login} from "@/features/auth/ui/Login/Login"
import {Route, Routes} from "react-router"
import {PrivateRoutes} from "@/common/components/PageNotFound/PrivateRoutes";
import {useAppSelector} from "@/common/hooks";
import {selectIsLoggedIn} from "@/features/auth/model/auth-slice";

export const Path = {
    Main: "/",
    Login: "login",
    NotFound: "*",
} as const

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    return (
        <Routes>
            <Route element={<PrivateRoutes isAllowed={isLoggedIn}/>}>
                <Route path={Path.Main} element={<Main/>}/>
            </Route>
            <Route element={<PrivateRoutes isAllowed={!isLoggedIn} redirextPath={Path.Main}/>}>
                <Route path={Path.Login} element={<Login/>}/>
            </Route>


        </Routes>
    )
}
