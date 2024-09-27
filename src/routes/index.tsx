import ErrorPage from './error-page'
import Attend from '../pages/Mobile/Attend';
import Auth from '../pages/Mobile/Auth';

import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <ErrorPage />,
  
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/attend",
    element: <Attend />,
  },


]);