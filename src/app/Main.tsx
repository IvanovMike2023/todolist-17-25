import {useAppDispatch} from "@/common/hooks"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"
import {createTodolistTC} from "@/features/todolists/model/todolists-slice"
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

export const Main = () => {
    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistTC(title))
    }
    // if (!init) {
    //     return (
    //         <Box sx={{display: 'flex'}}>
    //             <CircularProgress/>
    //         </Box>
    //     )
    // }
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
