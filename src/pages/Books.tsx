import { useGetBooksQuery } from "@/redux/api/booksApi";
import BookCardView from "@/components/BookCardView";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookCopy } from "lucide-react";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  const books = data?.data || [];

  if (isError) {
    return <div>Error loading books</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex gap-4 items-center justify-center'>
        <BookCopy size={40} />
        <h1 className='text-3xl font-bold'>Our Book Collection</h1>
      </div>
      <div>
        {isLoading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className='h-6' />
                  <Skeleton className='h-4 mt-2' />
                </CardHeader>
                <CardContent>{/* More skeletons */}</CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <BookCardView books={books} />
        )}
      </div>
      {/* {books && <BookCardView books={books} />} */}
    </div>
  );
};

export default Books;
