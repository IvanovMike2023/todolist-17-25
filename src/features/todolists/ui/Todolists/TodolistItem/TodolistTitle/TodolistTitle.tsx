import {EditableSpan} from "@/common/components"
import {useDeleteTodolistMutation, useUpdateTodolistTitleMutation,} from "@/features/todolists/api/todolistsApi"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {DomainTodolist} from "@/features/todolists/api/todolistsApi.types";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title, status} = todolist
    const [deleteTodolist] = useDeleteTodolistMutation()
    const [UpdateTodolistTitle] = useUpdateTodolistTitleMutation()

    const deleteTodolistHandler = async () => deleteTodolist(id)

    const changeTodolistTitle = (title: string) => UpdateTodolistTitle({todolistId: id, title: title})


    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={deleteTodolistHandler} disabled={status === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
