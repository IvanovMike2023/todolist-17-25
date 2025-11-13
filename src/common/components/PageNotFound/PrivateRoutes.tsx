import {useAppSelector} from "@/common/hooks";
import {selectIsLoggedIn} from "@/features/auth/model/auth-slice";
import {Path} from "@/common/routing";
import {Navigate, Outlet} from "react-router";
import {ReactNode} from "react";

type Props = {
    children?: ReactNode,
    isAllowed: boolean,
    redirextPath?: string
}

export const PrivateRoutes = ({children, redirextPath = Path.Login, isAllowed}: Props) => {
    if (!isAllowed) {
        return <Navigate to={redirextPath}/>
    }
    return children || <Outlet/>
}