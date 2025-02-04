import {createBrowserRouter } from "react-router"
import Home from "./component/Home"
import About from "./component/About"
import AppLayout from "./component/AppLayout"
import RecipesSidebar from "./component/RecipesSidebar"
import ErrorPage from "./component/ErrorPage"

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <ErrorPage/>,
        children: [
            { index: true, element: <Home /> },
            { path: 'home', element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'recipes', element: <RecipesSidebar />  }
        ]
    }
])