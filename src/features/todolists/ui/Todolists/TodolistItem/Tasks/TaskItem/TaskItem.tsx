import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan"
import {TaskStatus} from "@/common/enums"
import {useAppDispatch} from "@/common/hooks"
import type {DomainTask} from "@/features/todolists/api/tasksApi.types"
import {UpdateTaskModel} from "@/features/todolists/api/tasksApi.types";
import {useDeleteTaskMutation, useUpdateTasksItemMutation} from "@/features/todolists/api/tasksApi"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type {ChangeEvent} from "react"
import {getListItemSx} from "./TaskItem.styles"
import {Todolist} from "@/features/todolists/api/todolistsApi.types";

type Props = {
    task: DomainTask
    todolist: Todolist
}

export const TaskItem = ({task, todolist}: Props) => {
    const [DeleteTask] = useDeleteTaskMutation()
    const [UpdateTask] = useUpdateTasksItemMutation()
    const deleteTask = () => {
        DeleteTask({todolistId: todolist.id, taskId: task.id})
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {

        let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status
        }
        UpdateTask({todolistId: todolist.id, taskId: task.id, model})
    }
    const changeTaskTitle = (title: string) => {
        const model: UpdateTaskModel = {
            description: task.description,
             title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status:  task.status
        }
        UpdateTask({todolistId: todolist.id, taskId: task.id, model})
    }

    const isTaskCompleted = task.status === TaskStatus.Completed

    return (
        <ListItem sx={getListItemSx(isTaskCompleted)}>
            <div>
                <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} />
                <EditableSpan value={task.title} onChange={changeTaskTitle} />
            </div>
            <IconButton onClick={deleteTask} >
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
