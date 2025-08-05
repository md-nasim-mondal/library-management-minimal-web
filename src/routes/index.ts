import Main from "@/layouts/Main";
import Books from "@/pages/Books";
import CreateBook from "@/pages/CreateBook";
import { createBrowserRouter } from "react-router";
import BorrowSummary from "@/pages/BorrowSummary";
import BookDetailsPage from "@/pages/BookDetails";
import EditBook from "@/pages/EditBook";

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
        path: "/books",
        Component: Books,
      },
      {
        path: "/books/:id",
        Component: BookDetailsPage,
      },
      {
        path: "/create-book",
        Component: CreateBook,
      },
      {
        path: "/edit-book/:id",
        Component: EditBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
