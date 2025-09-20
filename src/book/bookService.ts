import cloudinary from "../config/cloudinary.ts";
import type { Book } from "./bookType.ts";
import path from "node:path";
import AuthRepository from "../auth/authRepository.ts";
import * as BookRepository from "./bookRepository.ts";

export const createBook = async(title: string, genre: string, userId: string, secure_urls: string[]): Promise<Book | null> => {
  
  const user = await AuthRepository.getUserById(userId);
  if (!user) {
    const error = new Error("User not found");
    throw error;
  }

  const book: Book = {
    title,
    genre,
    author: user,
    coverImage: secure_urls[0] || '',
    file: secure_urls[1] || '',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const savedBook = await BookRepository.createBook(book);
  return savedBook;
}

export const saveFilestoCloudinary = async(coverFileName: string, coverFilePath: string, coverFileMimeType: string, pdfFileName: string, pdfFilePath: string, pdfFileMimeType: string): Promise<string[] | []> => {

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
export const updateBook = async(bookId: string, title: string, genre: string, userId: string, secure_urls: string[]): Promise<Book | null> => {

  //TODO: If new file uploaded, then delete previous file from cloudinary
  const user = await AuthRepository.getUserById(userId);
  if (!user) {
    const error = new Error("User not found");
    throw error;
  }

  const updatedBook: Book | null = await BookRepository.updateBookFully(bookId, {
    title,
    genre,
    author: user,
    coverImage: secure_urls[0] || '',
    file: secure_urls[1] || '',
    updatedAt: new Date()
  });

  // return response
  return updatedBook;
}

//Update Partial book
export const updateBookPartially = async(id: string, title: string, genre: string, userId: string, secure_urls: string[]): Promise<Book | null> => {

  
  
  return null;
}

//Get All books
export const getAllBooks = async(): Promise<Book[] | null> => {

  // Get all books & return response
  return await BookRepository.getAllBooks();
}

//Get book by id
export const getBookById = async(id: string): Promise<Book | null> => {

  // Get book by id
  const book = await BookRepository.getBookById(id);

  return book;
}

//Delete book
export const deleteBook = async(id: string): Promise<boolean> => {

  // Delete book by id & return response
  return await BookRepository.deleteBook(id);
}

export const deleteFilesFromCloudinary = async(files: string[]): Promise<void | null> => {

  const coverImageFile = files[0];
  const pdfFile = files[1];

  if(coverImageFile) {
    const coverImageFileElements = coverImageFile.split('/') || '';
    const coverImageFilePublicId = (coverImageFileElements.at(-3) ?? '') + '/' + (coverImageFileElements.at(-2) ?? '') + '/' + (coverImageFileElements.at(-1)?.split('.').at(-2) ?? '');
    await cloudinary.uploader.destroy(coverImageFilePublicId);
  }

  if(pdfFile) {
    const pdfFileElements = pdfFile.split('/') || '';
    const pdfFilePublicId = (pdfFileElements.at(-3) ?? '') + '/' + (pdfFileElements.at(-2) ?? '') + '/' + (pdfFileElements.at(-1) ?? '');
    await cloudinary.uploader.destroy(pdfFilePublicId, {
      resource_type: "raw",
    });
  }
  
}