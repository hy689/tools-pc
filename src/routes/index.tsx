
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Test2 from "../pages/Test2";
import Permission from '../components/Permission'

type Route = RouteObject & {
  permissionCode: string;
};

export default createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/test",
        element: <Test/>,
      },
      {
        path: "/test2",
        element: <Test2/>,
      }
    ],
  }
] as Route[]);