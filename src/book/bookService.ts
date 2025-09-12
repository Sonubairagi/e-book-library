import e from "express";
import cloudinary from "../config/cloudinary.ts";
import bookModel from "./bookModel.ts";
import type { Book } from "./bookType.ts";
import path from "node:path";

//Create book
export const createBook = async(title: string, genre: string, userId: string, secure_urls: string[]): Promise<Book | null> => {

  const savedBook = await bookModel.create({
    title,
    genre,
    author: userId,
    coverImage: secure_urls[0],
    file: secure_urls[1],
  })

  return savedBook;
}

export const saveFilestoCloudinary = async(coverFileName: string, coverFilePath: string, coverFileMimeType: string, pdfFileName: string, pdfFilePath: string, pdfFileMimeType: string): Promise<string[] | null> => {

  const uploadCoverImageFileResultObject = await cloudinary.uploader.upload(coverFilePath, {
    public_id: path.parse(coverFileName).name,
    format: coverFileMimeType || 'auto',
    folder: "ebooks/covers",
  });

  const uploadPdfFileResultObject = await cloudinary.uploader.upload(pdfFilePath, {
    resource_type: "raw",
    public_id: path.parse(pdfFileName).name,
    format: pdfFileMimeType || 'auto',
    folder: "ebooks/pdfs",
  })

  const secure_urls = [uploadCoverImageFileResultObject.secure_url, uploadPdfFileResultObject.secure_url];
  return secure_urls;
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