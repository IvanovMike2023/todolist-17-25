// import { App } from "@/app/App"
// import { createRoot } from "react-dom/client"
// import "./index.css"
// import { Provider } from "react-redux"
// import { BrowserRouter } from "react-router"
// import { store } from "./app/store"
//
// createRoot(document.getElementById("root")!).render(
//     <BrowserRouter>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </BrowserRouter>,
// )

//
import { configureStore, createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { Provider, useDispatch, useSelector } from "react-redux"
import {isErrorWithMessage} from "@/common/utils";

// Slice
const appSlice = createSlice({
    name: "app",
    initialState: {
        error: null as string | null,
    },
    reducers: (create) => ({
        setError: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
    }),
    selectors: {
        selectError: (state) => state.error,
    },
})

const { selectError } = appSlice.selectors
const { setError } = appSlice.actions

// Api
type Post = {
    body: string
    id: string
    title: string
    userId: string
}

type Error = {
    errors: { field: string; message: string }[]
}

const api = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/",
        })(args, api, extraOptions)

        if (result.error) {
            if (result.error.status === 400) {
                const error = (result.error.data as Error).errors[0].message
                api.dispatch(setError({ error }))

            }
        }
        return result
    },
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => "posts",
            providesTags: ["Post"],
        }),
        removePost: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                method: "DELETE",
                url: `posts/${id}?delay=20`,
            }),
            invalidatesTags: ["Post"],
        }),
    }),
})

const { useGetPostsQuery, useRemovePostMutation } = api

// UI
const Header = () => <div style={{ width: "100%", background: "gray", border: "none", height: "50px" }}>header</div>

const LinearProgress = () => (
    <hr
        style={{
            height: "10px",
            width: "100%",
            background: "lightblue",
            border: "none",
            position: "absolute",
            left: "0px",
            top: "50px",
            right: "0px",
        }}
    />
)

const App = () => {
    const error = useSelector(selectError)

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setError({ error: null }))
        }, 4000)
    }, [error])

    return (
        <>
            <Header />
            {error && <h1 style={{ color: "red" }}>{error}</h1>}
            <Posts />
        </>
    )
}

const Posts = () => {
    const { data, isSuccess, isLoading: isPostsLoading } = useGetPostsQuery()
    const [removePost, { isLoading: isRemovePostLoading }] = useRemovePostMutation()

    const deletePostHandler = (id: string) => {
        removePost(id)
    }

    if (isPostsLoading || isRemovePostLoading) {
        return <LinearProgress />
    }

    return (
        <>
            {isSuccess && (
                <>
                    <h2>Posts</h2>
                    {data?.map((el) => {
                        return (
                            <div key={el.id} style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ border: "1px solid", margin: "5px", padding: "5px", width: "200px" }}>
                                    <p>
                                        <b>title</b> - {el.title}
                                    </p>
                                </div>
                                <button onClick={() => deletePostHandler(el.id)}>Delete post</button>
                            </div>
                        )
                    })}
                </>
            )}
        </>
    )
}

// Store
const store = configureStore({
    reducer: {
        [appSlice.name]: appSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>,
)

// 📜 Описание:
// Нажмите на кнопку удаления поста. Пост не удалится.

// 🪛 Задача:
// Ваша задача состоит в том, что разобраться почему пост не удаляется и вывести сообщение
// об ошибке на экран.
// Что нужно написать вместо "❗X" для того, чтобы при удалении поста он увидел ошибку
// ❗ Для типизации ошибки используйте type assertion с типом Error

//
// import { configureStore } from "@reduxjs/toolkit"
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { createRoot } from "react-dom/client"
// import { Provider, useDispatch } from "react-redux"
//
// type User = {
//     id: string
//     name: string
//     age: number
// }
//
// type UsersResponse = {
//     items: User[]
//     totalCount: number
// }
//
// // Api
// const api = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
//     endpoints: (builder) => {
//         return {
//             getUsers: builder.query<UsersResponse, void>({
//                 query: () => "users",
//             }),
//         }
//     },
// })
//
// const { useGetUsersQuery } = api
//
// // Users.tsx
// const Users = () => {
//     const { data } = useGetUsersQuery()
//
//     const dispatch = useAppDispatch()
//
//     const addSmileHandler = (id: string) => {
//         const smile = "😁"
//         dispatch(api.util.updateQueryData('getUsers', undefined, (state) => {
//             const item= state.items.find((t) => t.id === id)
//             if(item){
//                 console.log(item.name)
//                 item.name=`${item.name}${smile}`
//             }
//         }))
//         // ❗❗❗XXX❗❗❗
//     }
//
//     return (
//         <>
//             <h1>Users</h1>
//             {data?.items.map((el) => (
//                 <div key={el.id}>
//                     name - <b>{el.name}</b>
//                     <button onClick={() => addSmileHandler(el.id)}>Add smile</button>
//                 </div>
//             ))}
//         </>
//     )
// }
//
// // store.ts
// const store = configureStore({
//     reducer: { [api.reducerPath]: api.reducer },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
// })
//
// type AppDispatch = typeof store.dispatch
// const useAppDispatch = useDispatch.withTypes<AppDispatch>()
//
// createRoot(document.getElementById("root")!).render(
//     <Provider store={store}>
//         <Users />
//     </Provider>,
// )

// 📜 Описание:
// Откройте redux devtools и убедитесь, что данные из запроса хранятся в кеше
// http://surl.li/veofpd
// 🪛 Задача:
// При нажатии на кнопку `Add smile` необходимо изменить данные в кеше и добавить к имени переменную
// smile
// Результат: http://surl.li/kgmhtn
// Что нужно написать вместо `// ❗❗❗XXX❗❗❗`, чтобы реализовать данную задачу
// ❗Изменение стейта должно быть написано мутабельным образом
// ❗updateRecipe коллбек в качетстве аргумента принимает стейт. Назовите эту переменную state