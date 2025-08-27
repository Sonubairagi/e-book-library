import express from "express";
import * as bookHandler from "./bookController.ts";

const bookRouter = express.Router();

bookRouter.post("/", bookHandler.createBook);
bookRouter.patch("/:bookId", bookHandler.partialUpdateBook);
bookRouter.put("/:bookId", bookHandler.fullUpdateBook);
bookRouter.get("/:bookId", bookHandler.getBook);
bookRouter.get("/", bookHandler.getAllBooks);
bookRouter.delete("/:bookId", bookHandler.deleteBook);

export default bookRouter;