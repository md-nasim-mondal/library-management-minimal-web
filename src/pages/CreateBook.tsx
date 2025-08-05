import { useAddBookMutation } from "@/redux/api/booksApi";
import BookForm from "@/components/BookForm";
import type { IBook } from "@/types";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CreateBook = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: IBook) => {
    try {
      await addBook(data).unwrap();
      toast.success("Book added successfully");
      navigate("/books");
    } catch (err) {
      toast.error("Failed to add book");
      console.log(err);
    }
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Add New Book</h1>
      <BookForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default CreateBook;
