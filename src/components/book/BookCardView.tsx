import type { IBook } from "@/types";
import { useState } from "react";
import BookDeleteAlertDialog from "../modals/BookDeleteAlertDialog";
import BookCard from "./BookCard";
import BorrowModal from "../modals/BorrowModal";

interface IBookCardProps {
  books: IBook[];
  showDescription?: boolean;
}

const BookCardView = ({ books, showDescription = false }: IBookCardProps) => {
  const [selectedBook, setSelectedBook] = useState<IBook | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {books?.map((book, index) => (
          <BookCard
            key={index + 1}
            book={book}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            setIsBorrowDialogOpen={setIsBorrowDialogOpen}
            setSelectedBook={setSelectedBook}
            showDescription={showDescription}
          />
        ))}
      </div>
      {/* Delete Confirmation Dialog */}
      <BookDeleteAlertDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedBook={selectedBook}
      />
      {/* Borrow Modal */}
      <BorrowModal
        bookId={selectedBook?._id || ""}
        maxQuantity={selectedBook?.copies || 0}
        onOpenChange={setIsBorrowDialogOpen}
        open={isBorrowDialogOpen}
      />
    </>
  );
};

export default BookCardView;
