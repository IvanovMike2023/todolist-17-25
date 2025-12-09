import {useAppDispatch} from "@/common/hooks"
import {useCreateTaskMutation, useGetTaskQuery} from "@/features/todolists/api/tasksApi"
import {FilterButtons} from "./FilterButtons/FilterButtons"
import {Tasks} from "./Tasks/Tasks"
import {TodolistTitle} from "./TodolistTitle/TodolistTitle"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"
import {useState} from "react";
import {Todolist} from "@/features/todolists/api/todolistsApi.types";
import {loginApi} from "@/features/auth/api/1authApi";
import {any} from "zod";

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
    const[filter,setFilter]=useState(0)
    const {data,isLoading}= useGetTaskQuery(todolist.id)
    const [CreateTask]=useCreateTaskMutation()
  const createTask = (title: string) => {
      CreateTask({ todolistId: todolist.id,title:title})
  }


const filterselection=(f:number)=>{
    setFilter(f)
}
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={isLoading} />
      <Tasks filter={filter}  todolist={todolist} data={data?.items} />
      <FilterButtons filterselection={filterselection} todolist={todolist} />
    </div>
  )
}
