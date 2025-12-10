// import { App } from "@/app/App"
// import { createRoot } from "react-dom/client"
// import "./index.css"
// import { Provider } from "react-redux"
// import { BrowserRouter } from "react-router"
// import { store } from "./app/store"
//
//
// createRoot(document.getElementById("root")!).render(
//     <BrowserRouter>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </BrowserRouter>,
// )

import { configureStore } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"

type Product = {
    id: string
    title: string
    description: string
    price: number
}

export type Response = {
    total: number
    messages: string[]
    page: number
    pageCount: number
    data: Product[]
}

// Api
const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
    endpoints: (builder) => {
        return {
            getProducts: builder.query<Product[], void>({
                query: () => {
                    return {
                        method: "GET",
                        url: "products",
                    }
                },
                // ❗❗❗XXX❗❗❗
                transformResponse: ( response: Response ) => response.data,
            }),
        }
    },
})

const { useGetProductsQuery } = productsApi

// App.tsx
const App = () => {
    const { data: products } = useGetProductsQuery()

    return (
        <>
            {products?.map((el) => {
                return (
                    <div key={el.id} style={{ border: "1px solid", margin: "5px", padding: "5px" }}>
                        <p>title - {el.title}</p>
                        <p>description - {el.description}</p>
                    </div>
                )
            })}
        </>
    )
}

// store.ts
const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
})

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>,
)

// 📜 Описание:
// Белый экран. Откройте панель разработчика и проанализируйте в чем ошибка

// 🪛 Задача:
// Что нужно написать вместо  `// ❗❗❗XXX❗❗❗` чтобы на экране отобразились продукты
// В качестве ответа укажите написанный вами код
// ❗Типизацию указывать обязательно
// ❗Ответ принимает синтаксис стрелочной функции

