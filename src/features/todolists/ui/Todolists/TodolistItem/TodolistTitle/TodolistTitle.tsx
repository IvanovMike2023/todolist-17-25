import {EditableSpan} from "@/common/components"
import {useAppDispatch} from "@/common/hooks"
import {
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "@/features/todolists/model/todolists-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {Todolist} from "@/features/todolists/api/todolistsApi.types";

type Props = {
  todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist
const [deleteTodolist]=useDeleteTodolistMutation()
const [UpdateTodolistTitle]=useUpdateTodolistTitleMutation()
  const dispatch = useAppDispatch()
  const deleteTodolistHandler = () => {
    deleteTodolist({todolistId: id})
  }

  const changeTodolistTitle = (title: string) => {
    UpdateTodolistTitle({ todolistId: id, title:title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} >
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
