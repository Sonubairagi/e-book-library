import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { fileURLToPath } from 'url';
import path from "node:path";
import * as BookService from "./bookService.ts";
import fs from "node:fs";
import type { AuthRequest } from "../middlewares/authenticator.ts";

// 👇 Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create Book
const createBook = async (req: Request, res: Response, next: NextFunction) => {

  try {

     console.log(req.files);

  // Extract data from req.body
  const { title, genre } = req.body;

  // Extract file data by the help of multer
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const coverFileName = files?.coverImage?.[0]?.filename ?? '';
  const coverFilePath = path.resolve(__dirname, "../../public/data/uploads", coverFileName);
  const coverFileMimeType = files?.coverImage?.[0]?.mimetype?.split('/')?.[1];

  const pdfFileName = files?.file?.[0]?.filename ?? '';
  const pdfFilePath = path.resolve(__dirname, "../../public/data/uploads", pdfFileName);
  const pdfFileMimeType = files?.file?.[0]?.mimetype?.split('/')?.[1];

  // Validate data
  if (!title || !genre || !files?.coverImage || !files?.file) {
    const err = createHttpError(400, "All fields are required");
    return next(err);
  }

  // Save files on cloudinary
  const secure_urls: string[] | null = await BookService.saveFilestoCloudinary(coverFileName, coverFilePath, coverFileMimeType || 'auto', pdfFileName, pdfFilePath, pdfFileMimeType || 'auto');

  // Save book
  const _req = req as AuthRequest;
  console.log("_req.userId Controller:", _req.userId);
  
  const savedBook = await BookService.createBook(title, genre, _req.userId, secure_urls || []);

  // Delete temporary files from local storage
  await fs.promises.unlink(coverFilePath);
  await fs.promises.unlink(pdfFilePath);

  // Send response
  return res.status(201).json(savedBook);

  } catch (error) {
    return next(error);
  }

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