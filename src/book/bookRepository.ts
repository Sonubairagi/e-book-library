import type { Book } from "./bookType.ts";

//Create book
export const createBook = async(book: Book): Promise<Book | null> => {

  //TODO: Save book to DB
  
  return null;
}

//Upadate Full book
export const updateBookFully = async(id: string, book: Book): Promise<Book | null> => {

  //TODO: Update book to DB
  
  return null;
}

//Update Partial book
export const updateBookPartially = async(id: string, book: Partial<Book>): Promise<Book | null> => {

  //TODO: Update book to DB
  
  return null;
}

//Get All books
export const getAllBooks = async(): Promise<Book[] | null> => {

  //TODO: get all books from DB
  
  return null;
}

//Get book by id
export const getBookById = async(id: string): Promise<Book | null> => {

   //TODO: Get book by id from DB
  
  return null;
}

//Delete book
export const deleteBook = async(book: Book): Promise<boolean> => {

  //Delete book by id from DB
  
  return false;
}