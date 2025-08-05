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
  publishedYear?: number;
}

export interface IBorrow {
  _id?: string;
  bookId: string;
  quantity: number;
  dueDate: string;
  returned: boolean;
}

export interface IBorrowSummary {
  bookId: string;
  title: string;
  isbn: string;
  totalBorrowed: number;
}

export interface IBorrowBookRequest {
  bookId: string;
  quantity: number;
  dueDate: string;
}
