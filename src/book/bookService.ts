import type { Book } from "./bookType.ts";

//Create book
export const createBook = async(book: Book): Promise<Book | null> => {

  //TODO: Validate data
  //TODO: Save Image and PDF file to cloudinary
  //TODO: Delete temporary files from local storage
  //TODO: return response
  
  return null;
}

//Upadate Full book
export const updateBookFully = async(id: string, book: Book): Promise<Book | null> => {

  //TODO: Check book existance in db
  //TODO: Update Image and PDF file to cloudinary
  //TODO: If new file uploaded, then delete previous file from cloudinary
  //TODO: Delete temporary files from local storage
  //TODO: return response
  
  return null;
}

//Update Partial book
export const updateBookPartially = async(id: string, book: Partial<Book>): Promise<Book | null> => {

  //TODO: Check book existance in db
  //TODO: Update Image and PDF file to cloudinary
  //TODO: If new file uploaded, then delete previous file from cloudinary
  //TODO: Delete temporary files from local storage
  //TODO: return response
  
  return null;
}

//Get All books
export const getAllBooks = async(): Promise<Book[] | null> => {

  //TODO: get all books
  //TODO: return response
  
  return null;
}

//Get book by id
export const getBookById = async(id: string): Promise<Book | null> => {

  //TODO: Get book by id
  //TODO: return response
  
  return null;
}

//Delete book
export const deleteBook = async(book: Book): Promise<boolean> => {

  //TODO: Delete book by id
  //TODO: return response
  
  return false;
}