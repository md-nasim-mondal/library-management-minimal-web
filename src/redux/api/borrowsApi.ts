import type { IBorrow, IBorrowBookRequest } from "@/types";
import { baseApi } from "./baseApi";

export const borrowsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<IBorrow, IBorrowBookRequest>({
      query: ({ bookId, ...body }) => ({
        url: `/borrows/${bookId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),
    returnBook: builder.mutation({
      query: (id) => ({
        url: `/borrows/${id}/return`,
        method: "PATCH",
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
    getBorrowsByBook: builder.query({
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
