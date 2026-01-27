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
//



//
// import { configureStore } from "@reduxjs/toolkit"
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { createRoot } from "react-dom/client"
// import { Provider } from "react-redux"
// import {setupListeners} from "@reduxjs/toolkit/query";
//
// type Comment = {
//     postId: string
//     id: string
//     name: string
//     email: string
//     body: string
// }
//
// // Api
// const api = createApi({
//     reducerPath: "commentsApi",
//     tagTypes: ["Comment"],
//     baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
//     endpoints: (builder) => ({
//         getComments: builder.query<Comment[], void>({
//             query: () => "comments",
//             providesTags: ["Comment"],
//         }),
//         addComment: builder.mutation<Comment, string>({
//             query: (title) => ({
//                 method: "POST",
//                 url: "comments",
//                 body: { body: title },
//             }),
//             invalidatesTags: ["Comment"],
//         }),
//     }),
// })
//
// const { useGetCommentsQuery, useAddCommentMutation } = api
//
// // App.tsx
// const App = () => {
//     const { data } = useGetCommentsQuery(undefined, { refetchOnFocus: true })
//     const [addComment] = useAddCommentMutation()
//
//     const addCommentHandler = () => {
//         addComment("Тестовая строка. Ее менять не нужно")
//     }
//
//     return (
//         <>
//             <button onClick={addCommentHandler}>Add comment</button>
//             {data
//                 ?.slice()
//                 .reverse()
//                 .map((comment) => {
//                     return (
//                         <div key={comment.id} style={{ border: "1px solid", margin: "5px", padding: "5px" }}>
//                             <p>body - {comment.body}</p>
//                         </div>
//                     )
//                 })}
//         </>
//     )
// }
//
// // store.ts
// const store = configureStore({
//     reducer: {
//         [api.reducerPath]: api.reducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
//
// })
// setupListeners(store.dispatch)
// createRoot(document.getElementById("root")!).render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// )
//++++++
// На 39 строке добавлен refetchOnFocus.
// Но если открыть приложение в двух вкладках, добавить комментарий в одной вкладке,
// а потом перейти на другую, то нового комментария вы не увидите 🥲
// Ваша задача разобраться с тем, почему refetchOnFocus не работает.

// Что необходимо дописать в коде чтобы, починить refetchOnFocus ?
// 💡Если понадобится что-то импортировать для решения данной задачи,
// то импортируйте. В ответе добавленный импорт указывать не надо

//  В качестве ответа укажите добавленный код

//
//

//
// import { createRoot } from "react-dom/client"
// import { useState } from "react"
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { configureStore, nanoid } from "@reduxjs/toolkit"
// import { Provider } from "react-redux"
//
// type User = {
//     id: number
//     name: string
//     age: number
// }
//
// type UserResponse = {
//     totalCount: number
//     items: User[]
// }
//
// // Api
// const api = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
//     endpoints: (builder) => ({
//         getUsers: builder.query<UserResponse,{ pageSize: number, pageNumber: number }>({
//             query: (params) => {
//                 const { pageSize, pageNumber } = params;
//                 return {
//                     url: `users`,
//                     params: { pageSize, pageNumber }
//                 }
//             },
//         }),
//     }),
// })
//
// const { useGetUsersQuery } = api
//
// // App
// const PAGE_SIZE = 3
//
// export const App = () => {
//     const [currentPage, setCurrentPage] = useState(1)
//
//     const { data } = useGetUsersQuery({ pageSize: PAGE_SIZE, pageNumber: currentPage })
//
//     const setPageHandler = (page: number) => {
//         setCurrentPage(page)
//     }
//
//     const length = data?.totalCount ? Math.ceil(data?.totalCount / PAGE_SIZE) : 1
//     const buttons = Array.from({ length }, (_, i) => ({
//         id: nanoid(),
//         title: i + 1,
//     }))
//
//     return (
//         <>
//             <h1>👪 Список пользователей</h1>
//             {data?.items.map((u) => (
//                 <div style={{ marginBottom: "15px" }} key={u.id}>
//                     <b>name</b>: {u.name}
//                     <b>age</b>: {u.age}
//                 </div>
//             ))}
//
//             {buttons.map((b) => (
//                 <button
//                     key={b.id}
//                     style={b.title === currentPage ? { backgroundColor: "lightblue" } : {}}
//                     onClick={() => setPageHandler(b.title)}
//                 >
//                     {b.title}
//                 </button>
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
// createRoot(document.getElementById("root")!).render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// )

// 📜 Описание:
// При загрузке приложения отрисовывается список пользователей.
// Но если перейти на другие страницы, вы увидите, что пагинация не работает

// Перепишите getUsers таким образом, чтобы пагинация отрабатывала верно
// ❗Типизацию указывать обязательно
// ❗Очередность применения query параметров:
//  Первым: pageSize, вторым pageNumber.
// Это касается и типизации и все остальных участках кода,
// если вам понадобится доставать эти параметры

// Пример ответа
// getUsers: builder.query<{pageSize: any, pageNumber: any}>({
//   query: () => {
//     return {
//       url: `users`,
//     }
//   },
// }),
//
//
// import { configureStore } from "@reduxjs/toolkit"
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { createRoot } from "react-dom/client"
// import { Provider } from "react-redux"
// import { useState } from "react"
//
// type Post = {
//     body: string
//     id: string
//     title: string
//     userId: string
// }
//
// // Api
// const api = createApi({
//     reducerPath: "api",
//     tagTypes: ["Post"],
//     baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api" }),
//     endpoints: (builder) => ({
//         getPosts: builder.query<Post[], void>({
//             query: () => "posts",
//             providesTags: ["Post"],
//         }),
//         removePost: builder.mutation<{ message: string }, string>({
//             query: (id) => ({
//                 method: "DELETE",
//                 url: `posts/${id}?delay=3`,
//             }),
//             async onQueryStarted(id, { queryFulfilled, dispatch }) {
//                 const patchResult = dispatch(
//                     api.util.updateQueryData("getPosts", undefined, (state) => {
//                         const index = state.findIndex((post) => post.id === id)
//                         if (index !== -1) {
//                             state.splice(index, 1)
//                         }
//                     }),
//                 )
//                 try {
//                     // ❗❗❗XXX ❗❗❗
//                    await queryFulfilled
//                 } catch (error) {
//                     patchResult.undo()
//                     // ❗❗❗YYY ❗❗❗
//                 }
//             },
//             invalidatesTags: ["Post"],
//         }),
//     }),
// })
//
// const { useGetPostsQuery, useRemovePostMutation } = api
//
// // App.tsx
// const App = () => {
//     const { data } = useGetPostsQuery()
//     const [removePost] = useRemovePostMutation()
//
//     const [loadingId, setLoadingId] = useState<string | null>(null)
//
//     const removePostHandler = (id: string) => {
//         setLoadingId(id)
//         removePost(id).finally(() => {
//             setLoadingId(null)
//         })
//     }
//
//     return (
//         <>
//             {data?.map((el) => {
//                 return (
//                     <div key={el.id} style={{ display: "flex", alignItems: "center" }}>
//                         {loadingId === el.id && <h3>Loading...</h3>}
//                         <div style={{ border: "1px solid", margin: "5px", padding: "5px", width: "200px" }}>
//                             <b>title</b> - {el.title}
//                         </div>
//                         <button onClick={() => removePostHandler(el.id)}>X</button>
//                     </div>
//                 )
//             })}
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
// createRoot(document.getElementById("root")!).render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// )

// Optimistic update для удаления поста почти реализован.
// Что необходимо написать вместо // ❗❗❗XXX ❗❗❗ и // ❗❗❗YYY ❗❗❗
// для последующего отката изменений в случае ошибки при запросе на сервер?


//
//
// import { configureStore } from "@reduxjs/toolkit"
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { createRoot } from "react-dom/client"
// import { Provider } from "react-redux"
//
// type Comment = {
//     postId: string
//     id: string
//     name: string
//     email: string
//     body: string
// }
//
// // Api
// const api = createApi({
//     reducerPath: "commentsApi",
//     tagTypes: ["Comment"],
//     baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
//     endpoints: (builder) => ({
//         getComments: builder.query<Comment[], void>({
//             query: () => "comments",
//             providesTags: ["Comment"],
//             transformResponse: (response: Comment[]) => {
//                 //console.log(response)
//                 //console.log(response.reverse())
//                return  response.slice().reverse()
//             },
//             // ❗❗❗XXX ❗❗❗
//         }),
//         addComment: builder.mutation<Comment, string>({
//             query: (title) => ({
//                 method: "POST",
//                 url: "comments",
//                 body: { body: title },
//             }),
//             invalidatesTags: ["Comment"],
//         }),
//     }),
// })
//
// const { useGetCommentsQuery, useAddCommentMutation } = api
//
// // App.tsx
// const App = () => {
//     const { data } = useGetCommentsQuery()
//     const [addComment] = useAddCommentMutation()
//
//     const addCommentHandler = () => {
//         addComment("Тестовая строка. Ее менять не нужно")
//     }
//
//     return (
//         <>
//             <button onClick={addCommentHandler}>Add comment</button>
//             {data?.map((comment) => {
//                 return (
//                     <div key={comment.id} style={{ border: "1px solid", margin: "5px", padding: "5px" }}>
//                         <p>body - {comment.body}</p>
//                     </div>
//                 )
//             })}
//         </>
//     )
// }
//
// // store.ts
// const store = configureStore({
//     reducer: {
//         [api.reducerPath]: api.reducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
// })
//
// createRoot(document.getElementById("root")!).render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// )

// Нажмите на кнопку Add comment и убедитесь в том, что запрос проходит и новый комментарий добавляется
// Но проблема в том, что новый комментарий добавляется в конец массива

// Что необходимо написать вместо // ❗❗❗XXX ❗❗❗,
// чтобы поменять порядок элементов массива. Чтобы каждый новый добавленный комментарий
// отображался в начале массива