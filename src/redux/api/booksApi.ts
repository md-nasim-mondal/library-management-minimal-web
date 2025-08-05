import { baseApi } from "./baseApi"

interface Book {
  id: string
  title: string
  author: string
  genre: string
  isbn: string
  description: string
  copies: number
  available: boolean
}

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Book', id }],
    }),
    addBook: builder.mutation<Book, Omit<Book, 'id'>>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation<Book, Book>({
      query: ({ id, ...rest }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Book', id }],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
  }),
})

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi