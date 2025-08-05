import { baseApi } from "./baseApi";

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Book"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ _id, ...rest }) => {
        if (!_id || typeof _id !== "string" || !_id.trim()) {
          throw new Error("Book _id is required and must be a valid string for update.");
        }
        return {
          url: `/books/${_id}`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: (_result, _error, { _id }) =>
        _id ? [{ type: "Book", id: _id }] : [],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
