import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { fileURLToPath } from 'url';
import path from "node:path";
import * as BookService from "./bookService.ts";
import fs from "node:fs";
import type { AuthRequest } from "../middlewares/authenticator.ts";
import type { Book } from "./bookType.ts";
// import e from "express";

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
const partialUpdateBook = async(req: Request, res: Response, next: NextFunction) => {

  try {

    console.log(req.files);

    // Extract data from req.body
    const { bookId } = req.params;
    let { title, genre } = req.body;

    // Extract file data by the help of multer
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Validate data
    if (!bookId) {
      const err = createHttpError(400, "bookId is required");
      return next(err);
    }

    // is book exists
    const book = await BookService.getBookById(bookId);
    if(!book) {
      const err = createHttpError(404, "Book not found");
      return next(err);
    }

     // is user exists
    const _req = req as AuthRequest;
    // const user = await AuthService.getUserById(_req.userId)
    //   if (!user) {
    //     const error = new Error("User not found");
    //     throw error;
    //   }

    // Validate author
    if(book.author.toString() !== _req.userId) {
      const err = createHttpError(403, "You are not authorized to update this book");
      return next(err);
    }

    let secure_urls: string[] | [] = [];
    if(files) {
      const { coverFileName, coverFilePath, coverFileMimeType, pdfFileName, pdfFilePath, pdfFileMimeType } = await extractValues(files) || {};
      // Save files on cloudinary
      secure_urls = await BookService.saveFilestoCloudinary(coverFileName, coverFilePath, coverFileMimeType || 'auto', pdfFileName, pdfFilePath, pdfFileMimeType || 'auto');
      // Delete previous files from cloudinary
      const previousBookFiles = [book.coverImage, book.file];
      await BookService.deleteFilesFromCloudinary(previousBookFiles);
      // Delete temporary files from local storage
      await fs.promises.unlink(coverFilePath);
      await fs.promises.unlink(pdfFilePath);
    }

    if(!title)
      title = book.title;

    if(!genre)
      genre = book.genre

    if(!secure_urls?.[0])
      secure_urls[0] = book.coverImage;

    if(!secure_urls?.[1])
      secure_urls[1] = book.file;

    // update book
    const updatedBook = await BookService.updateBook(bookId, title, genre, _req.userId, secure_urls);

    // Send response
    return res.status(201).json(updatedBook);

  } catch (error) {
    return next(error);
  }

}

//Full Update Book
const fullUpdateBook = async(req: Request, res: Response, next: NextFunction) => {
  
  try {

    console.log(req.files);

    // Extract data from req.body
    const { title, genre } = req.body;
    const { bookId } = req.params;

    // Extract file data by the help of multer
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Validate data
    if (!bookId ||!title || !genre || !files?.coverImage || !files?.file) {
      const err = createHttpError(400, "All fields are required");
      return next(err);
    }

    const { coverFileName, coverFilePath, coverFileMimeType, pdfFileName, pdfFilePath, pdfFileMimeType } = await extractValues(files) || {};

    // is book exists
    const book = await BookService.getBookById(bookId);
    if(!book) {
      const err = createHttpError(404, "Book not found");
      return next(err);
    }

    // Validate author
    const _req = req as AuthRequest;
    if(book.author.toString() !== _req.userId) {
      const err = createHttpError(403, "You are not authorized to update this book");
      return next(err);
    }

    // Save files on cloudinary
    const secure_urls: string[] | [] = await BookService.saveFilestoCloudinary(coverFileName, coverFilePath, coverFileMimeType || 'auto', pdfFileName, pdfFilePath, pdfFileMimeType || 'auto');

    // Delete previous files from cloudinary
    const previousBookFiles = [book.coverImage, book.file];
    await BookService.deleteFilesFromCloudinary(previousBookFiles);

    // update book
    const updatedBook = await BookService.updateBook(bookId, title, genre, _req.userId, secure_urls || []);

    // Delete temporary files from local storage
    await fs.promises.unlink(coverFilePath);
    await fs.promises.unlink(pdfFilePath);

    // Send response
    return res.status(201).json(updatedBook);

  } catch (error) {
    return next(error);
  }

}

const extractValues = async (files: { [fieldname: string]: Express.Multer.File[] }) => {
  
  const coverFileName = files?.coverImage?.[0]?.filename ?? '';
    const coverFilePath = path.resolve(__dirname, "../../public/data/uploads", coverFileName);
    const coverFileMimeType = files?.coverImage?.[0]?.mimetype?.split('/')?.[1];

    const pdfFileName = files?.file?.[0]?.filename ?? '';
    const pdfFilePath = path.resolve(__dirname, "../../public/data/uploads", pdfFileName);
    const pdfFileMimeType = files?.file?.[0]?.mimetype?.split('/')?.[1];

    return { coverFileName, coverFilePath, coverFileMimeType, pdfFileName, pdfFilePath, pdfFileMimeType };
}

//Get Single Book
const getBook = async(req: Request, res: Response, next: NextFunction) => {

  try {

    // Extract bookId from req.params
    const { bookId} = req.params;

    // Validate bookId
    if(!bookId) {
      const err = createHttpError(400, "Book ID is required");
      return next(err);
    }

    // Get book by id
    const book = await BookService.getBookById(bookId);

    // Send response
    return res.status(200).json(book as Book);

  } catch (error) {
    return next(error);
  }
  
}

//Get All Books
const getAllBooks = async(req: Request, res: Response, next: NextFunction) => {
  
  try {

  // Get all books
  const books: Book[] | null = await BookService.getAllBooks();

  // Send response
  return res.status(200).json(books);

  } catch (error) {
    return next(error);
  }

}

//Delete Book
const deleteBook = async(req: Request, res: Response, next: NextFunction) => {

  try {

  // Extract bookId from req.params
    const { bookId } = req.params;

  // Validate bookId
    if (!bookId) {
      const err = createHttpError(400, "Book ID is required");
      return next(err);
    }

  // is book exists
    const book = await BookService.getBookById(bookId);

    if(!book) {
      const err = createHttpError(400, "Book Not Found!");
      return next(err);
    }

  // Validate author
    const _req = req as AuthRequest;
    if(book?.author?.toString() !== _req.userId) {
      const err = createHttpError(403, "You are not authorized to delete this book");
      return next(err);
    }

  // Delete files from cloudinary
  const files = [book.coverImage, book.file];
  await BookService.deleteFilesFromCloudinary(files);

  // Delete book by id
    const isDeleted = BookService.deleteBook(bookId);

  // if book not deleted then throw error
    if (!isDeleted) {
      const err = createHttpError(500, "Book not deleted");
      return next(err);
    }

  // Send response
  return res.status(200).json({ message: "Book deleted successfully" });

  } catch (error) {
    return next(error);
  }

}

export { createBook, partialUpdateBook, fullUpdateBook, getBook, getAllBooks, deleteBook };