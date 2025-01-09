import {createBrowserRouter } from "react-router"
import Home from "./component/Home"
import About from "./component/About"
import AppLayout from "./component/AppLayout"

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error</h1>,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'about', element: <About /> }
        ]
    }
])