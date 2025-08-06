import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/booksApi";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { IBook } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: isBookLoading } = useGetBookByIdQuery(id || "");
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const book = data?.data;

  const form = useForm<IBook>({
    values: book || {
      _id: "",
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      publishedYear: undefined,
      image: "",
    },
  });

  const onSubmit = async (values: IBook) => {
    try {
      const { updatedAt, createdAt, ...rest } = values;
      await updateBook(rest).unwrap();
      toast.success("Book updated successfully");
      navigate(`/books/${values._id}`);
    } catch (error) {
      toast.error("Failed to update book");
    }
  };

  if (isBookLoading) {
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <div className='bg-card text-card-foreground rounded-lg border shadow-sm p-6'>
          <Skeleton className='h-8 w-1/3 mb-6' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-5 w-1/4' />
                <Skeleton className='h-9 w-full' />
              </div>
            ))}
          </div>
          <div className='space-y-2 mb-6'>
            <Skeleton className='h-5 w-1/4' />
            <Skeleton className='h-24 w-full' />
          </div>
          <div className='flex justify-end gap-2'>
            <Skeleton className='h-9 w-24' />
            <Skeleton className='h-9 w-24' />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className='container mx-auto p-4 max-w-4xl text-center'>
        Book not found
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div className='bg-card text-card-foreground rounded-lg border shadow-sm p-6'>
        <h1 className='text-2xl font-bold mb-6'>Edit Book</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input placeholder='Book title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='author'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author*</FormLabel>
                    <FormControl>
                      <Input placeholder='Author name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='genre'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue
                            placeholder={field.value || "Select a genre to set"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='w-full'>
                        <SelectItem value='FICTION'>FICTION</SelectItem>
                        <SelectItem value='NON_FICTION'>NON_FICTION</SelectItem>
                        <SelectItem value='SCIENCE'>SCIENCE</SelectItem>
                        <SelectItem value='HISTORY'>HISTORY</SelectItem>
                        <SelectItem value='BIOGRAPHY'>BIOGRAPHY</SelectItem>
                        <SelectItem value='FANTASY'>FANTASY</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isbn'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN*</FormLabel>
                    <FormControl>
                      <Input placeholder='ISBN number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='publishedYear'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publication Year</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='1600'
                        max={new Date().getFullYear()}
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='copies'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies*</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='0'
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder='Image URL' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='available'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center gap-3 pt-6 pl-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='leading-none'>
                      <FormLabel>Available for borrowing</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Book description'
                      className='min-h-[120px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  if (window.history.length > 2) {
                    navigate(-1);
                  } else {
                    navigate(`/books/${book._id}`);
                  }
                }}>
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditBook;
