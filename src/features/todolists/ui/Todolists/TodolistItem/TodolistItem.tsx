import {useCreateTaskMutation, useGetTaskQuery} from "@/features/todolists/api/tasksApi"
import {FilterButtons} from "./FilterButtons/FilterButtons"
import {Tasks} from "./Tasks/Tasks"
import {TodolistTitle} from "./TodolistTitle/TodolistTitle"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"
import {DomainTodolist} from "@/features/todolists/api/todolistsApi.types";
import {Pagination} from "@/common/Pagination/Pagination";
import {useState} from "react";

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const {data,isLoading}= useGetTaskQuery({todolistId:todolist.id,params:{page}})
    const [CreateTask]=useCreateTaskMutation()
  const createTask = (title: string) => {
      CreateTask({ todolistId: todolist.id,title:title})
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={isLoading} />
      <Tasks   todolist={todolist} page={page} />
        <Pagination
            currentPage={page}
            pageSize={pageSize}
            setCurrentPage={setPage}
            pagesCount={data?.totalCount || 1}
        />
      <FilterButtons todolist={todolist} />
    </div>
  )
}


