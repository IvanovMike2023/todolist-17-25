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
import {DomainTodolist, Todolist} from "@/features/todolists/api/todolistsApi.types";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title, status} = todolist
  const [deleteTodolist] = useDeleteTodolistMutation()
    const dispatch = useAppDispatch()

    const changeTodolistUtils = (value: string) => {
        dispatch(todolistApi.util.updateQueryData('getTodolists', undefined, (st) => {
            const newtodolist = st.find((fl) => fl.id === id)
            if (newtodolist) {
                newtodolist.title = value
            }
        }))
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id).unwrap().catch(() => {
            changeTodolistUtils('loading')
        })

    }
    const changeTodolistTitle = (title: string) => {
        //UpdateTodolistTitle({ todolistId: id, title:title })
        changeTodolistUtils(title)
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
