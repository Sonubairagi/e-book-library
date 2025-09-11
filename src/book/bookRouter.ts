import express from "express";
import * as bookHandler from "./bookController.ts";
import multer from "multer";
import { fileURLToPath } from 'url';
import path from "node:path";

// 👇 Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookRouter = express.Router();

//multer
try {
    const upload = multer({
        dest: path.resolve(__dirname, "../../public/data/uploads"),
        limits: { fileSize: 3e7 }, //30MB
    })
    bookRouter.post("/", upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "file", maxCount: 1 },

    ]), bookHandler.createBook);
    bookRouter.get("/all", bookHandler.getAllBooks);
    bookRouter.get("/:bookId", bookHandler.getBook);
    bookRouter.put("/:bookId", bookHandler.fullUpdateBook);
    bookRouter.patch("/:bookId", bookHandler.partialUpdateBook);
    bookRouter.delete("/:bookId", bookHandler.deleteBook);

} catch (error) {
    console.log("Error in bookRouter.ts", error);
}

export default bookRouter;