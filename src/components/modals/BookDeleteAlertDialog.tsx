import { useDeleteBookMutation } from "@/redux/api/booksApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { IBook } from "@/types";

interface IBookDeleteAlertDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void;
  selectedBook: IBook | null;
}

const BookDeleteAlertDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedBook,
}: IBookDeleteAlertDialogProps) => {
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();
  const handleDelete = async (bookId: string) => {
    try {
      await deleteBook(bookId).unwrap();
      toast.success("Book deleted successfully");
      navigate("/books");
    } catch (error) {
      toast.error("Failed to delete book");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete "
            {selectedBook?.title || ""}" from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(selectedBook?._id || "")}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookDeleteAlertDialog;
