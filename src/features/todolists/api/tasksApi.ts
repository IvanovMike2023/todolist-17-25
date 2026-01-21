import {GetTasksResponse, type UpdateTaskModel} from "@/features/todolists/api/tasksApi.types"
import {baseApi} from "@/app/api/baseApi";
import {PAGE_SIZE} from "@/common/constants";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTask: build.query<GetTasksResponse, { todolistId: string, params: { page: number } }>({
            query: ({todolistId, params}) => {
                return {
                    url: `/todo-lists/${todolistId}/tasks`,
                    params: {...params, count: PAGE_SIZE}
                }
            },
            providesTags: (res, err, {todolistId}) =>
                [{type: 'Tasks', id: todolistId},]
        }),
        updateTasksItem: build.mutation<void, { todolistId: string, taskId: string, model: UpdateTaskModel }>({
            query: (data) => {
                const {todolistId, taskId, model} = data
                return {
                    url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                    method: 'PUT',
                    body: model
                }
            },
            onQueryStarted: async ({todolistId, taskId, model}, {getState,dispatch, queryFulfilled}) => {

                const args = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTask')
                const patchResults:any[]=[]
                args.forEach((arg)=>{
                    patchResults.push(dispatch(tasksApi.util.updateQueryData('getTask', {
                        todolistId,
                        params: {page: arg.params.page}
                    }, (state) => {
                        const index = state.items.findIndex(todo => todo.id === taskId)
                        if (index !== -1) {
                            state.items[index] = {...state.items[index], ...model}
                        }
                    })))
                })
                try {
                    await queryFulfilled
                } catch (e) {
                    patchResults.forEach((patchResult)=>{
                        patchResult.undo()
                    })

                }
            },
            invalidatesTags: (_res, _err, {todolistId}) =>
                [{type: 'Tasks', id: todolistId}]
        }),
        createTask: build.mutation<void, { todolistId: string, title: string }>({
            query: ({todolistId, title}) => {
                return {
                    url: `/todo-lists/${todolistId}/tasks`,
                    method: 'post',
                    body: {title}
                }
            },
            invalidatesTags: (_res, _err, {todolistId}) =>
                [{type: 'Tasks', id: todolistId}]
        }),
        deleteTask: build.mutation<void, { todolistId: string, taskId: string }>({
            query: ({todolistId, taskId}) => ({url: `/todo-lists/${todolistId}/tasks/${taskId}`, method: 'delete'}),
            invalidatesTags: (_res, _err, arg) => [{type: 'Tasks', id: arg.todolistId}]
        })
    }),

})

export const {
    useGetTaskQuery,
    useDeleteTaskMutation,
    useCreateTaskMutation,
    useUpdateTasksItemMutation
} = tasksApi

