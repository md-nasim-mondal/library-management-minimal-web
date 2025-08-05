import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenIcon, TrashIcon, BookOpenIcon, InfoIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import type { IBook } from "@/types";
import toast from "react-hot-toast";
import { useDeleteBookMutation } from "@/redux/api/booksApi";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface IBookCardProps {
  books: IBook[];
  showDescription?: boolean;
}

const BookCardView = ({ books, showDescription = false }: IBookCardProps) => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [deleteBook] = useDeleteBookMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {books?.map((book) => (
          <Card
            key={book._id}
            className='flex flex-col h-full hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='text-lg truncate' title={book.title}>
                {book.title}
              </CardTitle>
              <div
                className='text-sm text-muted-foreground truncate'
                title={book.author}>
                {book.author}
              </div>
            </CardHeader>

            <CardContent className='flex-grow'>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Genre:</span>
                  <Badge variant='outline'>{book.genre}</Badge>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>ISBN:</span>
                  <span className='text-sm'>{book.isbn}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>Copies:</span>
                  <span className='text-sm'>{book.copies}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>Status:</span>
                  <Badge variant={book.available ? "default" : "destructive"}>
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>

                {showDescription && book.description && (
                  <div className='pt-2'>
                    <p className='text-sm line-clamp-3 text-muted-foreground'>
                      {book.description}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className='flex justify-between'>
              <Button asChild size='sm' variant='ghost'>
                <Link
                  to={`/books/${book._id}`}
                  className='flex items-center gap-1'>
                  <InfoIcon className='h-4 w-4' />
                  <span>Details</span>
                </Link>
              </Button>

              <div className='flex space-x-1'>
                <Button
                  asChild
                  size='icon'
                  variant='outline'
                  className='h-8 w-8'>
                  <Link to={`/edit-book/${book._id}`} title='Edit'>
                    <PenIcon className='h-3 w-3' />
                  </Link>
                </Button>
                <Button
                  asChild
                  size='icon'
                  variant='outline'
                  className='h-8 w-8'>
                  <Link to={`/borrow/${book._id}`} title='Borrow'>
                    <BookOpenIcon className='h-3 w-3' />
                  </Link>
                </Button>
                <Button
                  onClick={() => {
                    setIsDeleteDialogOpen(true);
                    setSelectedBook(book);
                  }}
                  size='icon'
                  variant='outline'
                  className='h-8 w-8'
                  title='Delete'>
                  <TrashIcon className='h-3 w-3' />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}>
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
    </>
  );
};

export default BookCardView;
