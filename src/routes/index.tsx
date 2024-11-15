
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Test from "../pages/Test";
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
      }
    ],
  }
] as Route[]);