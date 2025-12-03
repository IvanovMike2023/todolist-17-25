import { EditableSpan } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"
import {
  changeTodolistTitleTC,
  deleteTodolistTC,
  type DomainTodolist, useDeleteTodolistMutation, useUpdateTodolistTitleMutation,
} from "@/features/todolists/model/todolists-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
const [deleteTodolist]=useDeleteTodolistMutation()
const [UpdateTodolistTitle]=useUpdateTodolistTitleMutation()
  const dispatch = useAppDispatch()
  const deleteTodolistHandler = () => {
    deleteTodolist({todolistId: id})
  }

  const changeTodolistTitle = (title: string) => {
    UpdateTodolistTitle({ todolistId: id, title:title })
    //dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
