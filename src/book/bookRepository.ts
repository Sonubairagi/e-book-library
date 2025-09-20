import type { Book } from "./bookType.ts";
import bookModel from "./bookModel.ts";

//Create book
export const createBook = async (book: Book): Promise<Book | null> => {

  // Save book to DB
  return await bookModel.create(book);
}

//Upadate Full book
export const updateBookFully = async (id: string, book: Book): Promise<Book | null> => {

  // Update book to DB
  const updatedBook = await bookModel.findOneAndUpdate({ _id: id }, book, { new: true });
  return updatedBook ? updatedBook : null;
}

//Update Partial book
export const updateBookPartially = async (id: string, book: Partial<Book>): Promise<Book | null> => {

  //TODO: Update book to DB

  return null;
}

//Get All books
export const getAllBooks = async (): Promise<Book[] | null> => {

  // Get all books from DB and return response
  return await bookModel.find();
}

//Get book by id
export const getBookById = async (id: string): Promise<Book | null> => {

  // Get book by id from DB
  const book = await bookModel.findById(id);

  return book ? book : null;
}

//Delete book
export const deleteBook = async (id: string): Promise<boolean> => {

  //Delete book by id from DB & return response
  const result = await bookModel.deleteOne({ _id: id });
  return result.deletedCount === 1;
}