export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  description?: string;
  image?: string;
  publishedYear?: number | null;
}

export interface IBorrow {
  _id?: string;
  bookId: string;
  quantity: number;
  dueDate: string;
  returned: boolean;
}

export interface IBorrowBook {
  bookId: string;
  title: string;
  isbn: string;
}

export interface IBorrowSummary {
  book: IBorrowBook;
  totalQuantity: number;
}

export interface IBorrowBookRequest {
  bookId: string;
  quantity: number;
  dueDate: string;
}
