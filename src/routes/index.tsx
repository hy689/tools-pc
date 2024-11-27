
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

import { lazy } from "react";

const App = lazy(() => import('../App'));
const Home = lazy(() => import('../pages/Home'));
const PreviewPPTX = lazy(() => import('../pages/dome/pptx'));
const PreviewOffice = lazy(() => import('../pages/dome/office'));


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