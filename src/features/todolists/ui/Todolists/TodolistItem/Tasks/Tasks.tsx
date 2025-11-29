import {TaskStatus} from "@/common/enums"
import {useAppDispatch} from "@/common/hooks"
import type {DomainTodolist} from "@/features/todolists/model/todolists-slice"
import {TaskItem} from "./TaskItem/TaskItem"
import List from "@mui/material/List"

type Props = {
  data:any,
  todolist: DomainTodolist
}
export const Tasks = ({ todolist,data }: Props) => {
  const { id, filter } = todolist
  const dispatch = useAppDispatch()
let filteredTasks
  if(data){
    filteredTasks = data
    if (filter === "active") {
      filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.New)
    }
    if (filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.Completed)
    }
  }
  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}</List>
      )}
    </>
  )
}
