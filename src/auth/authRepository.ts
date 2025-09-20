import authModel from "./authModel.ts";
import type { User } from "./authType.ts";

//Save User
const saveUser = async (user: User): Promise<User | null> => {
  const savedUser = authModel.create(user)
  return savedUser;
}

//Get User by email
const getUserByEmail = async (email: string): Promise<User | null> => {
  const isUserExists = authModel.findOne({email})
  return isUserExists;
}

// Get User by id
const getUserById = async (id: string): Promise<User | null> => {
  const user = authModel.findById(id);
  return user;
}

export default { saveUser, getUserByEmail, getUserById };