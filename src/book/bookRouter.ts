import express from "express";
import { createBook, deleteBook, fullUpdateBook, getAllBooks, getBook, partialUpdateBook } from "./bookController.ts";

const bookRouter = express.Router();

bookRouter.post("/", createBook);
bookRouter.patch("/:bookId", partialUpdateBook);
bookRouter.put("/:bookId", fullUpdateBook);
bookRouter.get("/:bookId", getBook);
bookRouter.get("/", getAllBooks);
bookRouter.delete("/:bookId", deleteBook);

export default bookRouter;