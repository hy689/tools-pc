
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

export default createBrowserRouter([
  {
    path: "/",
  },
  {
    path: "/home",
    element: <Home />,
  },
]);