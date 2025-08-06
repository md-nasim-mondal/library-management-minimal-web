import type { IBookCardViewProps } from "@/types";
import BookCard from "./BookCard";

const BookCardView = ({ books }: IBookCardViewProps) => {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {books?.map((book, index) => (
          <BookCard key={index + 1} book={book} />
        ))}
      </div>
    </>
  );
};

export default BookCardView;
