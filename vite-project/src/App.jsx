import Footer from "./components/footer/Footer";
import NavbarComp from "./components/navbarComp/NavbarComp"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import Service from "./pages/service/Service";
import MyServices from "./pages/myservices/MyServices";
import AddNew from "./pages/addnew/AddNew";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import NavMenu from './components/navmenu/NavMenu'
import Orders from "./pages/orders/Orders";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Search from "./components/search/Search";



function App() {

  const queryClient = new QueryClient()

  const Layout = ()=>
{
  return(
    <div>
        <QueryClientProvider client={queryClient}>

    <NavbarComp />
    <NavMenu />

    <Outlet />
    <Footer />
    </QueryClientProvider>
    </div>

  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/services",
        element:<Services />
      },
      {
        path:"/service/:id",
        element:<Service />
      },
      {
        path:"/myservices",
        element:<MyServices />
      },
      {
        path:"/addnew",
        element:<AddNew />
      },
      {
        path:"/messages",
        element:<Messages />
      },
      {
        path:"/message/:id",
        element:<Message />
      },
      {
        path:"/orders",
        element:<Orders />
      },
      {
        path:"/login",
        element:<Login />
      },
      {
        path:"/register",
        element:<Register />
      },
    ]
  },
]);
  return (
   <div>
   <RouterProvider router={router} />
   </div>
  )
}

export default App
