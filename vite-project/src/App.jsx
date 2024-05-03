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
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import getCurrentUser from "./utils/getCurrentUser";
import List from "./pages/list/List";

import User from "./pages/user/User";
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";
import ListServices from "./pages/listServices/ListServices";
import UpdateService from "./pages/updateService/UpdateService";
import UpdateUser from "./pages/updateUser/UpdateUser";


function App() {
  const queryClient = new QueryClient()

  const Layout = ()=>
{
  return(
    <div>
        <QueryClientProvider client={queryClient}>

   <NavbarComp  />
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
        path:"/users/:id",
        element:<User />
      },
      {
        path:"/list",
        element:<List />
      },
      {
        path:"/listservices",
        element:<ListServices />
      },
      {
        path:"/admindashboard",
        element:<AdminDashboard />
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
        path:"/updateService/:id",
        element:<UpdateService />
      },
      {
        path:"/updateuser/:id",
        element:<UpdateUser />
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
      {
        path:"/success",
        element:<Success />
      },
      {
        path:"/pay/:id",
        element:<Pay />
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
