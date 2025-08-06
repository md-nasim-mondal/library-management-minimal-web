import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Link } from "react-router";
import { BookOpenIcon } from "lucide-react";
import type { IBorrowSummary } from "@/types";

interface IBorrowSummaryTableProps {
  BorrowsData: IBorrowSummary[];
}

const BorrowSummaryTable = ({ BorrowsData }: IBorrowSummaryTableProps) => {
  return (
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
              <TableCell className='font-medium'>{item?.book?.title}</TableCell>
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
  );
};

export default BorrowSummaryTable;
