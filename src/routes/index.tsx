
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import PreviewPPTX from "../pages/dome/pptx";
import PreviewOffice from "../pages/dome/office";
import Permission from '../components/Permission'

export type Route = RouteObject & {
  permissionCode: string;
  name: string;
  children?: Route[]
};

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        name: '首页',
        path: "/home",
        element: <Home />,
      },
      {
        name: '测试',
        path: '/dome',
        children: [
          {
            name: '预览pptx',
            path: '/dome/pptx',
            element: <PreviewPPTX />,
          },
          {
            name: '预览office',
            path: '/dome/office',
            element: <PreviewOffice />,
          },
        ]
      }
    ],
  },
  {
    path: "/login",
    element: <Navigate to="/home" />
  }
] as Route[]

export default createBrowserRouter(routes);