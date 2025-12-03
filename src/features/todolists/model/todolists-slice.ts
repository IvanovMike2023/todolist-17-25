import {type UpdateTaskModel} from "@/features/todolists/api/tasksApi.types"
import {baseApi} from "@/app/api/baseApi";
import {BaseResponse} from "@/common/types";
import {Todolist} from "@/features/todolists/api/todolistsApi.types";


export const todolistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<Todolist[], void>({
      query: () => `/todo-lists`,
      providesTags: ['Todolist']
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>,{title:string}>({
      query: (title) => {
        return {
          url: `/todo-lists/`,
          method:'POST',
          body: {title}
        }
      },
      invalidatesTags: ['Todolist']
    }),

    updateTodolistTitle: build.mutation<BaseResponse,{todolistId:string,title:UpdateTaskModel}>({
      query: ({todolistId, title}) => {
        return {
          url: `/todo-lists/${todolistId}`,
          method: 'PUT',
          body: {title}
        }
      },
      invalidatesTags: ['Todolist']
    }),
    deleteTodolist: build.mutation<BaseResponse,{todolistId:string}>({
      query: ({todolistId}) => ({url: `/todo-lists/${todolistId}`, method: 'delete'}),
      invalidatesTags: ['Todolist']
    })
  }),

})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation
} = todolistApi

