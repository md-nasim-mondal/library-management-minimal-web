import Main from "@/layouts/Main";
import Books from "@/pages/Books";
import AddBook from "@/pages/AddBook";
import { createBrowserRouter } from "react-router";
import BorrowSummary from "@/pages/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        index: true,
        Component: Books,
      },
      {
        path: "/all-books",
        Component: Books,
      },
      {
        path: "/add-book",
        Component: AddBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
