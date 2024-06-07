import Footer from "./components/footer/Footer";
import NavbarComp from "./components/navbarComp/NavbarComp";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import Service from "./pages/service/Service";
import MyServices from "./pages/myservices/MyServices";
import AddNew from "./pages/addnew/AddNew";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Orders from "./pages/orders/Orders";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import List from "./pages/list/List";
import User from "./pages/user/User";
import ListServices from "./pages/listServices/ListServices";
import UpdateService from "./pages/updateService/UpdateService";
import UpdateUser from "./pages/updateUser/UpdateUser";
import ListOrders from "./pages/listOrders/ListOrders";
import SearchComp from "./components/searchComp/searchComp";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = new QueryClient();
  const isServicesPage = location.pathname === "/services";

  const Layout = () => {
    return (
      <div>
        <QueryClientProvider client={queryClient}>
          <NavbarComp />
          {!isServicesPage && <SearchComp />}
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/users/:id", element: <User /> },
        { path: "/services", element: <Services /> },
        { path: "/service/:id", element: <Service /> },
        { path: "/myservices", element: <MyServices /> },
        { path: "/addnew", element: <AddNew /> },
        { path: "/updateService/:id", element: <UpdateService /> },
        { path: "/updateuser/:id", element: <UpdateUser /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },
        { path: "/orders", element: <Orders /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/success", element: <Success /> },
        { path: "/pay/:id", element: <Pay /> },
        {
          path: "/",
          element: <ProtectedRoute isAdmin={currentUser?.admin} />,
          children: [
            { path: "/admindashboard", element: <AdminDashboard /> },
            { path: "/list", element: <List /> },
            { path: "/listservices", element: <ListServices /> },
            { path: "/listorders", element: <ListOrders /> },
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
