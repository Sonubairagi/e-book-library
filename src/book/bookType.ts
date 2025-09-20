import type { User } from "../auth/authType.ts";

export interface Book {
  _id?: string;
  title: string;
  author: User;
  genre: string;
  coverImage: string;
  file: string;
  createdAt?: Date;
  updatedAt: Date;
}