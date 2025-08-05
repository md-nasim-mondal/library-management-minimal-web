import { useGetBorrowSummaryQuery } from "@/redux/api/borrowsApi";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpenIcon } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";
import type { IBorrowSummary } from "@/types";

const BorrowSummary = () => {
  const { data, isLoading, isError, refetch } =
    useGetBorrowSummaryQuery(undefined);

  const BorrowsData = data?.data || [];

  console.log(BorrowsData);

  if (isLoading) {
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <div className='bg-card text-card-foreground rounded-lg border shadow-sm p-6'>
          <Skeleton className='h-8 w-1/3 mb-6' />
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  {[...Array(4)].map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className='h-4 w-24' />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(4)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className='h-4 w-full' />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load borrow summary");
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <div className='bg-card text-card-foreground rounded-lg border shadow-sm p-6 text-center'>
          <p className='mb-4'>Failed to load borrow summary</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div className='bg-card text-card-foreground rounded-lg border shadow-sm p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Borrow Summary</h1>
          <Button onClick={() => refetch()} variant='outline'>
            Refresh
          </Button>
        </div>

        {BorrowsData?.length === 0 ? (
          <div className='text-center py-12'>
            <BookOpenIcon className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
            <h3 className='text-lg font-medium'>No borrow records found</h3>
            <p className='text-muted-foreground mt-2'>
              There are currently no books borrowed from the library.
            </p>
          </div>
        ) : (
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Title</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Total Borrowed</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BorrowsData?.map((item: IBorrowSummary) => (
                  <TableRow key={item?.book?.bookId}>
                    <TableCell className='font-medium'>
                      {item?.book?.title}
                    </TableCell>
                    <TableCell>{item?.book?.isbn}</TableCell>
                    <TableCell>{item?.totalQuantity}</TableCell>
                    <TableCell className='text-right'>
                      <Button asChild variant='outline' size='sm'>
                        <Link to={`/books/${item?.book?.bookId}`}>
                          <BookOpenIcon className='h-4 w-4 mr-2' />
                          View Book
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowSummary;
