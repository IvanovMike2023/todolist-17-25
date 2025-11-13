import {useAppSelector} from "@/common/hooks";
import {selectIsLoggedIn} from "@/features/auth/model/auth-slice";
import {Path} from "@/common/routing";
import {Navigate} from "react-router";
import {ReactNode} from "react";
type Props={
    children: ReactNode
}
export const PrivateRoutes=({children}:Props)=>{
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    if(!isLoggedIn){
        return <Navigate to={Path.Login} />
    }
    return children
}