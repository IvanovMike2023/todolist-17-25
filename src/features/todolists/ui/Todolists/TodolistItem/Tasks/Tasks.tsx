import {TaskItem} from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {Todolist} from "@/features/todolists/api/todolistsApi.types";
import {DomainTask, domainTaskSchema} from "@/features/todolists/api/tasksApi.types";

type Props = {
    todolist: string
    data:  DomainTask[]
    filter: number
}
export const Tasks = ({todolist, data, filter}: Props) => {
    console.log(data)
    let filteredTasks
    if (data) {
        filteredTasks = data
    }

    if (filter === 1) {
        filteredTasks = data.filter((el) => el.status === 0)
    }
    if (filter === 2) {
        filteredTasks = data.filter((el) => el.status === 2)
    }
    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist}/>)}</List>
            )}
        </>
    )
}
