import {type DomainTask, GetTasksResponse, type UpdateTaskModel} from "@/features/todolists/api/tasksApi.types"
import {baseApi} from "@/app/api/baseApi";
import {loginSchema} from "@/features/auth/lib/schemas";
import {nanoid} from "@reduxjs/toolkit";

export type TasksState = Record<string, DomainTask[]>


export const tasksApi = baseApi.injectEndpoints({
endpoints: (build) => ({
    getTask: build.query<GetTasksResponse, {todolistId:string,params:{count:number,page:number}}>({
      query: ({todolistId,params}) => {
          return {
              url: `/todo-lists/${todolistId}/tasks`,params
          }
      },
       providesTags:(res, err,id)=>
        res ? res.items.map((task) => {
               return {type: 'Tasks', id: task.id}
           }) : ['Tasks']

           //return [{type: 'Tasks', id: nanoid()}]

           //? [...res.items.map(({ id }) => ({ type: "Tasks", id }) as const), { type: "Tasks", id: todolistId }]
            //['Tasks']
    }),
    updateTasksItem: build.mutation<void, {todolistId:string,taskId:string,model: UpdateTaskModel }>({
      query: (data) => {
        const {todolistId,taskId,model}=data
        return {
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          method:'PUT',
          body:model
        }
      },
        invalidatesTags: ['Tasks']//(res,err,{taskId})=> [{type:'Tasks',id:taskId}],
    }),
    createTask: build.mutation<void,{todolistId:string,title:string}>({
      query: ({todolistId, title}) => {
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          method: 'post',
          body: {title}
        }
      },
        invalidatesTags:['Tasks'] //(res,err,{todolistId})=> [{type:'Tasks', id:todolistId }],
    }),
    deleteTask: build.mutation<void,{todolistId:string,taskId:string}>({
      query: ({todolistId, taskId}) => ({url: `/todo-lists/${todolistId}/tasks/${taskId}`, method: 'delete'}),
      invalidatesTags: ['Tasks']//(res,err,{taskId})=> [{type:'Tasks',id:taskId}],
    })
  }),

})

export const {
  useGetTaskQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTasksItemMutation
} = tasksApi

