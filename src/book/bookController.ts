import type { NextFunction, Request, Response } from "express";

//Create Book
const createBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract data from req.body
  //TODO: Extract file data by the help of multer
  //TODO: Validate data
  //TODO: Save Image and PDF file to cloudinary
  //TODO: Delete temporary files from local storage
  //TODO: Save book to DB
  //TODO: Send response

  return res.json("Book created");
}

//Partial Update Book
const partialUpdateBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract data from req.body
  //TODO: Extract file data by the help of multer
  //TODO: Validate data
  //TODO: Check book existance in db
  //TODO: Update Image and PDF file to cloudinary
  //TODO: If new file uploaded, then delete previous file from cloudinary
  //TODO: Delete temporary files from local storage
  //TODO: Update book to DB
  //TODO: Send response

  return res.json("Book created");
}

//Full Update Book
const fullUpdateBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract data from req.body
  //TODO: Extract file data by the help of multer
  //TODO: Validate data
  //TODO: Check book existance in db
  //TODO: Update Image and PDF file to cloudinary
  //TODO: If new file uploaded, then delete previous file from cloudinary
  //TODO: Delete temporary files from local storage
  //TODO: Update book to DB
  //TODO: Send response

  return res.json("Book created");
}

//Get Single Book
const getBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract bookId from req.params
  //TODO: Validate bookId
  //TODO: Get book from DB
  //TODO: Send response
  
  return res.json("Book created");
}

//Get All Books
const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: get all books from DB
  //TODO : Send response

  return res.json("Book created");
}

//Delete Book
const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract bookId from req.params
  //TODO: Validate bookId
  //TODO: Delete book from DB
  //TODO: Send response

  return res.json("Book created");
}

export { createBook, partialUpdateBook, fullUpdateBook, getBook, getAllBooks, deleteBook };