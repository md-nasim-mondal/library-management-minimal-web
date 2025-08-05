import Main from "@/layouts/Main";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
  },
]);

export default router;