import {type DomainTask, GetTasksResponse, type UpdateTaskModel} from "@/features/todolists/api/tasksApi.types"
import {baseApi} from "@/app/api/baseApi";

export type TasksState = Record<string, DomainTask[]>



export const tasksApi = baseApi.injectEndpoints({
endpoints: (build) => ({
    getTask: build.query<GetTasksResponse, string>({
      query: (todolistId:string) => `/todo-lists/${todolistId}/tasks`,
       providesTags: ['Tasks']
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
      invalidatesTags: ['Tasks']
    }),
    createTask: build.mutation<void,{todolistId:string,title:string}>({
      query: ({todolistId, title}) => {
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          method: 'post',
          body: {title}
        }
      },
      invalidatesTags: ['Tasks']
    }),
    deleteTask: build.mutation<void,{todolistId:string,taskId:string}>({
      query: ({todolistId, taskId}) => ({url: `/todo-lists/${todolistId}/tasks/${taskId}`, method: 'delete'}),
      invalidatesTags: ['Tasks']
    })
  }),

})

export const {
  useGetTaskQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTasksItemMutation
} = tasksApi

