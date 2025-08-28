import type { NextFunction, Request, Response } from "express";

//Create Book
const createBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract data from req.body
  //TODO: Extract file data by the help of multer
  //TODO: Validate data
  //TODO: Save book
  //TODO: Send response

  return res.json("Book created");
}

//Partial Update Book
const partialUpdateBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract data from req.body
  //TODO: Extract file data by the help of multer
  //TODO: Validate data
  //TODO: Update book partially
  //TODO: Send response

  return res.json("Book Updated Partially");
}

//Full Update Book
const fullUpdateBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract data from req.body
  //TODO: Extract file data by the help of multer
  //TODO: Validate data
  //TODO: Update book fully
  //TODO: Send response

  return res.json("Book Updated Fully");
}

//Get Single Book
const getBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract bookId from req.params
  //TODO: Validate bookId
  //TODO: Get book by id
  //TODO: Send response
  
  return res.json("Get Single Book");
}

//Get All Books
const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: get all books
  //TODO : Send response

  return res.json("Get All Books");
}

//Delete Book
const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  // Logic to create a book

  //TODO: Extract bookId from req.params
  //TODO: Validate bookId
  //TODO: Delete book by id
  //TODO: Send response

  return res.json("Book Deleted Successfully!");
}

export { createBook, partialUpdateBook, fullUpdateBook, getBook, getAllBooks, deleteBook };