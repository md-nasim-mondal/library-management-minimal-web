import { baseApi } from "./baseApi";

interface Borrow {
  id: string;
  bookId: string;
  quantity: number;
  dueDate: string;
  returned: boolean;
}

interface BorrowSummary {
  bookId: string;
  title: string;
  isbn: string;
  totalBorrowed: number;
}

interface BorrowBookRequest {
  bookId: string;
  quantity: number;
  dueDate: string;
}

export const borrowsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<Borrow, BorrowBookRequest>({
      query: ({ bookId, ...body }) => ({
        url: `/borrows/${bookId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),
    returnBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/borrows/${id}/return`,
        method: "PATCH",
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => "/borrows/summary",
      providesTags: ["Borrow"],
    }),
    getBorrowsByBook: builder.query<Borrow[], string>({
      query: (bookId) => `/borrows/book/${bookId}`,
      providesTags: (_result, _error, bookId) => [
        { type: "Borrow", id: bookId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBorrowBookMutation,
  useReturnBookMutation,
  useGetBorrowSummaryQuery,
  useGetBorrowsByBookQuery,
} = borrowsApi;
