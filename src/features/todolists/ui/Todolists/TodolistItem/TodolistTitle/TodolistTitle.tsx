import {EditableSpan} from "@/common/components"
import {useAppDispatch} from "@/common/hooks"
import {
    todolistApi,
    useDeleteTodolistMutation, useGetTodolistsQuery,
    useUpdateTodolistTitleMutation,
} from "@/features/todolists/api/todolistsApi"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {DomainTodolist, StatusValues, Todolist} from "@/features/todolists/api/todolistsApi.types";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title, status} = todolist
    const [deleteTodolist] = useDeleteTodolistMutation()
    const [UpdateTodolistTitle] = useUpdateTodolistTitleMutation()
    const dispatch = useAppDispatch()

    const deleteTodolistHandler = async () => {
        const patchResult = dispatch(todolistApi.util.updateQueryData('getTodolists', undefined, (state) => {
            const index = state.findIndex(todo => {
                return todo.id === id
            })
            if (index !== -1) state.splice(index, 1)
        }))
        try {
            await deleteTodolist(id).unwrap()
        } catch (e) {
            patchResult.undo()
        }
    }
    const changeTodolistTitle = (title: string) => {
        UpdateTodolistTitle({todolistId: id, title: title})
    }

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
