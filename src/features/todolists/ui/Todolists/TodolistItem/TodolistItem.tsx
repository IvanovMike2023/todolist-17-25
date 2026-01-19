import {useCreateTaskMutation, useGetTaskQuery} from "@/features/todolists/api/tasksApi"
import {FilterButtons} from "./FilterButtons/FilterButtons"
import {Tasks} from "./Tasks/Tasks"
import {TodolistTitle} from "./TodolistTitle/TodolistTitle"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"
import {DomainTodolist} from "@/features/todolists/api/todolistsApi.types";

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
    const {data,isLoading}= useGetTaskQuery({todolistId:todolist.id,params:{page:1}})
    const [CreateTask]=useCreateTaskMutation()
  const createTask = (title: string) => {
      CreateTask({ todolistId: todolist.id,title:title})
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={isLoading} />
      <Tasks   todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}


