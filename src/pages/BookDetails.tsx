import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BookOpenIcon, PenIcon, TrashIcon } from "lucide-react";
import { Link, useParams } from "react-router";
import { useState } from "react";
import BookDeleteAlertDialog from "@/components/modals/BookDeleteAlertDialog";
import BorrowModal from "@/components/modals/BorrowModal";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(id || "");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);

  const book = data?.data || {};

  if (isLoading) {
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <div className='bg-card text-card-foreground rounded-lg border shadow-sm p-6'>
          <Skeleton className='h-8 w-3/4 mb-4' />
          <Skeleton className='h-6 w-1/2 mb-8' />

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-5 w-1/3' />
                <Skeleton className='h-4 w-full' />
              </div>
            ))}
          </div>

          <Skeleton className='h-5 w-1/4 mb-2' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6 mt-2' />
        </div>
      </div>
    );
  }

  if (!book)
    return (
      <div className='container mx-auto p-4 max-w-4xl text-center'>
        Book not found!
      </div>
    );

  const handleDeleteModal = () => {
    setIsBorrowDialogOpen(false);
    setIsDeleteDialogOpen(true);
  };
  const handleBorrowModal = () => {
    if (book.copies === 0 || !book.available) {
          return toast.error(
            "This Book is not available for borrowing! Borrow another one."
          );
        }
    setIsDeleteDialogOpen(false);
    setIsBorrowDialogOpen(true);
  };

  return (
    <>
      <div className='container mx-auto p-4 max-w-4xl'>
        <div className='bg-card text-card-foreground rounded-lg border shadow-sm overflow-hidden'>
          <div className='md:flex'>
            {/* Book Cover Image Section */}
            <div className='md:w-1/3 p-6 bg-muted/50 flex items-center justify-center'>
              {book.image ? (
                <img
                  src={book?.image}
                  alt={`Cover of ${book.title}`}
                  className='w-full h-auto max-h-96 object-contain rounded-md border shadow-sm'
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/default-book-cover.jpg";
                  }}
                />
              ) : (
                <div className='w-full h-64 bg-muted flex items-center justify-center text-muted-foreground rounded-md border'>
                  <BookOpenIcon className='h-16 w-16' />
                </div>
              )}
            </div>

            {/* Book Details Section */}
            <div className='md:w-2/3 p-6'>
              <div className='flex justify-between items-start'>
                <div>
                  <h1 className='text-2xl font-bold mb-2'>{book.title}</h1>
                  <h2 className='text-lg text-muted-foreground mb-6'>
                    {book.author}
                  </h2>
                </div>
                <Button asChild size='sm' variant='outline'>
                  <Link
                    to={`/edit-book/${book._id}`}
                    className='flex items-center gap-1'>
                    <PenIcon className='h-4 w-4' />
                    Edit
                  </Link>
                </Button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <div className='space-y-2'>
                  <div className='font-medium'>Genre</div>
                  <div className='text-muted-foreground'>{book.genre}</div>
                </div>
                <div className='space-y-2'>
                  <div className='font-medium'>ISBN</div>
                  <div className='text-muted-foreground'>{book.isbn}</div>
                </div>
                <div className='space-y-2'>
                  <div className='font-medium'>Publication Year</div>
                  <div className='text-muted-foreground'>
                    {book.publishedYear || "N/A"}
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='font-medium'>Availability</div>
                  <div className='text-muted-foreground'>
                    {book.available ? (
                      <span className='text-success'>
                        Available ({book.copies} copies)
                      </span>
                    ) : (
                      <span className='text-destructive'>Not Available</span>
                    )}
                  </div>
                </div>
              </div>

              {book.description && (
                <div className='space-y-2'>
                  <div className='font-medium'>Description</div>
                  <p className='text-muted-foreground whitespace-pre-line'>
                    {book.description}
                  </p>
                </div>
              )}

              <div className='mt-8 flex gap-2'>
                <Button onClick={() => handleBorrowModal()} asChild>
                  <span className='flex items-center gap-1'>
                    <BookOpenIcon className='h-4 w-4' />
                    Borrow This Book
                  </span>
                </Button>
                <Button
                  variant='destructive'
                  onClick={() => handleDeleteModal()}
                  className='flex items-center gap-1'>
                  <TrashIcon className='h-4 w-4' />
                  Delete Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <BookDeleteAlertDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        book={book}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />

      {/* Borrow Modal */}
      <BorrowModal
        bookId={book?._id || ""}
        maxQuantity={book?.copies || 0}
        onOpenChange={setIsBorrowDialogOpen}
        open={isBorrowDialogOpen}
      />
    </>
  );
};

export default BookDetails;
