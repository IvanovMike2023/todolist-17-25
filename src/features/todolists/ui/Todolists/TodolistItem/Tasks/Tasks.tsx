import {TaskItem} from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {DomainTodolist, Todolist} from "@/features/todolists/api/todolistsApi.types";
import {DomainTask, domainTaskSchema} from "@/features/todolists/api/tasksApi.types";

type Props = {
    todolist: any
    data:  DomainTask[]
}
export const Tasks = ({todolist, data,}: Props) => {
    let filteredTasks=data
    if (data) {
        filteredTasks = data
    }

    if (todolist.filter === 'active') {
        filteredTasks = data.filter((el) => el.status === 2)
    }
    if (todolist.filter === 'completed') {
        filteredTasks = data.filter((el) => el.status === 1)
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
