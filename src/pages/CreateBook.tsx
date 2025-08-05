import { useAddBookMutation } from "@/redux/api/booksApi";
import { useNavigate } from "react-router";
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
import type { IBook } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateBook = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();

  const form = useForm<Omit<IBook, "_id">>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      publishedYear: null,
      image: "",
    },
  });

  const onSubmit = async (values: Omit<IBook, "_id">) => {
    try {
      await addBook(values).unwrap();
      toast.success("Book added successfully");
      navigate("/books");
    } catch (error) {
      toast.error("Failed to add book");
      console.log(error);
    }
  };

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div className='bg-card text-card-foreground rounded-lg border shadow-sm p-6'>
        <h1 className='text-2xl font-bold mb-6'>Add New Book</h1>

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
                          <SelectValue placeholder='Select a genre to set' />
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
                        max={new Date().getFullYear()}
                        min={1600}
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? null
                              : parseInt(e.target.value)
                          )
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
                        min='1'
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
                onClick={() => navigate("/books")}>
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Book"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBook;
