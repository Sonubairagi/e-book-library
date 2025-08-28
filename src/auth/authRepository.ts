import authModel from "./authModel.ts";
import type { User } from "./authType.ts";

//Save User
const saveUser = (user: User) => {
  authModel.create(user);
}

//Get User by email
const getUserByEmail = (email: string) => {
  authModel.findOne({email})
}