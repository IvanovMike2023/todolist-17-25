import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"
import {createTodolistTC} from "@/features/todolists/model/todolists-slice"
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import {selectIsLoggedIn} from "@/features/auth/model/auth-slice";
import {useNavigate} from "react-router";
import {Path} from "@/common/routing";

export const Main = () => {
    const dispatch = useAppDispatch()
let navigate = useNavigate()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
 if(isLoggedIn===false){
     navigate(Path.Login)
 }

    const createTodolist = (title: string) => {
        dispatch(createTodolistTC(title))
    }
    return (
        <Container maxWidth={"lg"}>
            <Grid container sx={{mb: "30px"}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>

                <Todolists/>
            </Grid>
        </Container>
    )
}
