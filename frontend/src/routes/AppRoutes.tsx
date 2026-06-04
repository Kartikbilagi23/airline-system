import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import SearchFlight from "../pages/SearchFlight"
import BookingPage from "../pages/BookingPage"
import Signup from '../pages/Signup'
import CheckOutPage from '../pages/CheckOutPage.js'
import SuccessPage from "../pages/SuccessPage.js"
import BookingDetails from "../pages/BookingDetails.js"

const router=createBrowserRouter([
    {   
        path:"/",
        element:<Home/>
    },
    {
        path:'/bookings/:id',
        element:<BookingPage/>
    },
    {
        path:'/checkout',
        element:<CheckOutPage/>
    },
    {
        path:'/success',
        element:<SuccessPage/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/search",
        element:<SearchFlight/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/mybookings",
        element:<BookingDetails/>
    }
])


const AppRoutes = () => {
  return <RouterProvider router={router}/>
}
export default AppRoutes