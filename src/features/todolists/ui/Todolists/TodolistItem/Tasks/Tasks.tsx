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
}
export const Tasks = ({todolist}: Props) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const {data, isLoading, error} = useGetTaskQuery({todolistId:todolist.id,params:{page:currentPage,count:4}})

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
                                                              todolist={todolist}/>)}<Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    setCurrentPage={setCurrentPage}
                    pagesCount={data?.totalCount || 1}
                    /></List>
            )}
        </>
    )
}
