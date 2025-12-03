import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {fetchTodolistsTC, selectTodolists, useGetTodolistsQuery} from "@/features/todolists/model/todolists-slice"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {useEffect} from "react"
import {TodolistItem} from "./TodolistItem/TodolistItem"

export const Todolists = () => {
    const {data, isLoading} = useGetTodolistsQuery()
    if (!isLoading) {
        return (
            <>
                {data.map((todolist) => (
                    <Grid key={todolist.id}>
                        <Paper sx={{p: "0 20px 20px 20px"}}>
                            <TodolistItem todolist={todolist}/>
                        </Paper>
                    </Grid>
                ))}
            </>
        )
    }

}
