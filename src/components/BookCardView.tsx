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
import { Link } from "react-router";

interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  description?: string;
}

interface IBookCardProps {
  books: IBook[];
  showDescription?: boolean;
}

const BookCardView = ({ books, showDescription = false }: IBookCardProps) => {
  return (
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
              <Button asChild size='icon' variant='outline' className='h-8 w-8'>
                <Link to={`/edit-book/${book._id}`} title='Edit'>
                  <PenIcon className='h-3 w-3' />
                </Link>
              </Button>
              <Button asChild size='icon' variant='outline' className='h-8 w-8'>
                <Link to={`/borrow/${book._id}`} title='Borrow'>
                  <BookOpenIcon className='h-3 w-3' />
                </Link>
              </Button>
              <Button
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
  );
};

export default BookCardView;
