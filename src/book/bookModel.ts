import mongoose from "mongoose";
import type { Book } from "./bookType.ts";

const bookSchema = new mongoose.Schema<Book>({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
},
{timestamps: true});

const bookModel = mongoose.model<Book>("Book", bookSchema);

export default bookModel;