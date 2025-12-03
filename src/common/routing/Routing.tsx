import {Main} from "@/app/Main"
import {Login} from "@/features/auth/ui/Login/Login"
import {Route, Routes} from "react-router"
import {PrivateRoutes} from "@/common/components/PageNotFound/PrivateRoutes";
import {useAppSelector} from "@/common/hooks";
import {PageNotFound} from "@/common/components";
import {selectisLoggedIn} from "@/app/app-slice";

export const Path = {
    Main: "/",
    Login: "login",
    NotFound: "*",
} as const

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectisLoggedIn)
    return (
        <Routes>
            <Route element={<PrivateRoutes isAllowed={isLoggedIn}/>}>
                <Route path={Path.Main} element={<Main/>}/>
            </Route>
            <Route element={<PrivateRoutes isAllowed={!isLoggedIn} redirextPath={Path.Main}/>}>
                <Route path={Path.Login} element={<Login/>}/>
            </Route>
                <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}
