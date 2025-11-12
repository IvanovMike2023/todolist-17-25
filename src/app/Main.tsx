import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"
import {createTodolistTC} from "@/features/todolists/model/todolists-slice"
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import {meTC, selectIsLoggedIn} from "@/features/auth/model/auth-slice";
import {Navigate} from "react-router";
import {Path} from "@/common/routing";
import {useEffect} from "react";

export const Main = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const createTodolist = (title: string) => {
        dispatch(createTodolistTC(title))
    }
    return (
        <Container maxWidth={"lg"}>
            <Grid container sx={{mb: "30px"}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {!isLoggedIn && <Navigate to={Path.Login}/>}
                <Todolists/>
            </Grid>
        </Container>
    )
}
