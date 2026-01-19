import {baseApi} from "@/app/api/baseApi";
import {BaseResponse} from "@/common/types";
import {DomainTodolist, Todolist} from "@/features/todolists/api/todolistsApi.types";


export const todolistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => `/todo-lists`,
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
          todolists.map((todolist) => ({ ...todolist, filter: "all",status:"idle"})),
      providesTags: ['Todolist']
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>,{title:string}>({
      query: ({title}) => {
        return {
          url: `/todo-lists`,
          method:'POST',
          body: {title}
        }
      },
      invalidatesTags: ['Todolist']
    }),

    updateTodolistTitle: build.mutation<BaseResponse,{todolistId:string,title:string}>({
      query: ({todolistId, title}) => {
        return {
          url: `/todo-lists/${todolistId}`,
          method: 'PUT',
          body: {title}
        }
      },
      invalidatesTags: ['Todolist']
    }),
    deleteTodolist: build.mutation<BaseResponse,string>({
      query:id => ({url: `/todo-lists/${id}`, method: 'delete'}),
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
            todolistApi.util.updateQueryData('getTodolists', undefined, state => {
              const todolist = state.find(todolist => todolist.id === id)
              if (todolist) {
                todolist.status = 'loading'
              }
            })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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

