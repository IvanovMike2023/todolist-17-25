import { useAppDispatch } from "@/common/hooks"
import {createTaskTC, useCreateTaskMutation, useGetTaskQuery} from "@/features/todolists/model/tasks-slice"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
    const {data}= useGetTaskQuery(todolist.id)
    const [CreateTask]=useCreateTaskMutation()
  const createTask = (title: string) => {
      CreateTask({ todolistId: todolist.id, title })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks data={data?.items} todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
