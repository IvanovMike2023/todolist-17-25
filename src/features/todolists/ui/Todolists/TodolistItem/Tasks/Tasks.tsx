import {TaskItem} from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {useGetTaskQuery} from "@/features/todolists/api/tasksApi";
import {TaskSkeleton} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskSkeleton/TasksSkeleton";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/common/hooks";
import {setAppErrorAC} from "@/app/app-slice";
import {Pagination} from "@/common/Pagination/Pagination";

type Props = {
    todolist: any
    page:number
}
export const Tasks = ({todolist,page}: Props) => {


    const {data, isLoading, error} = useGetTaskQuery({todolistId:todolist.id,params:{page}})

    if (isLoading) {
        return <TaskSkeleton/>
    }
    let filteredTasks = data?.items
    if (data?.items) {
        filteredTasks = data.items
    }
    if (todolist.filter === 'active') {
        filteredTasks = data?.items.filter((el) => el.status === 2)
    }
    if (todolist.filter === 'completed') {
        filteredTasks = data?.items.filter((el) => el.status === 1)
    }
    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task}
                                                              todolist={todolist}/>)}</List>
            )}
        </>
    )
}
