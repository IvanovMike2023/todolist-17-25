import {type DomainTask, GetTasksResponse, type UpdateTaskModel} from "@/features/todolists/api/tasksApi.types"
import {baseApi} from "@/app/api/baseApi";
import {loginSchema} from "@/features/auth/lib/schemas";
import {nanoid} from "@reduxjs/toolkit";

export type TasksState = Record<string, DomainTask[]>


export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTask: build.query<GetTasksResponse, { todolistId: string, params: { count: number, page: number } }>({
            query: ({todolistId, params}) => {
                return {
                    url: `/todo-lists/${todolistId}/tasks`, params
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

