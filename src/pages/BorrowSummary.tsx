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
import { BookOpenIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { IBorrowSummary } from "@/types";
import BorrowSummaryTable from "@/components/book/borrow/BorrowSummaryTable";

const BorrowSummary = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError, refetch } = useGetBorrowSummaryQuery({
    page,
    limit,
  });

  const borrowsData: IBorrowSummary[] = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1 };

  const handlePreviousPage = () => page > 1 && setPage(page - 1);
  const handleNextPage = () => page < meta.totalPages && setPage(page + 1);

  if (isLoading) {
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <div className='bg-card text-card-foreground rounded-lg border shadow-sm p-6'>
          <Skeleton className='h-8 w-1/3 mb-6' />
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  {["Title", "ISBN", "Quantity", "Actions"].map((label) => (
                    <TableHead key={label}>
                      <Skeleton className='h-4 w-24' />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: limit }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((_, j) => (
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
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Label>Items:</Label>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  setPage(1);
                }}>
                <SelectTrigger className='w-[100px]'>
                  <SelectValue placeholder='10' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='20'>20</SelectItem>
                  <SelectItem value='50'>50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => refetch()} variant='outline'>
              Refresh
            </Button>
          </div>
        </div>

        {borrowsData.length === 0 ? (
          <div className='text-center py-12'>
            <BookOpenIcon className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
            <h3 className='text-lg font-medium'>No borrow records found</h3>
            <p className='text-muted-foreground mt-2'>
              There are currently no books borrowed from the library.
            </p>
          </div>
        ) : (
          <>
            {/* Borrow Summary Table */}
            <BorrowSummaryTable BorrowsData={borrowsData} />
            {/* Pagination Controls */}
            <div className='flex items-center justify-between mt-6'>
              <div className='text-sm text-muted-foreground'>
                Showing {borrowsData.length} of {meta.total} records
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={handlePreviousPage}
                  disabled={page === 1}>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <span>
                  Page {page} of {meta.totalPages}
                </span>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={handleNextPage}
                  disabled={page >= meta.totalPages}>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BorrowSummary;
