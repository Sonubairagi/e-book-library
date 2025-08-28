import type { User } from "./authType.ts";

//Register
export const registerUser = async(user: User): Promise<User | null> => {

    //TODO: Check if user already exists
    //TODO: Hash password
    //TODO: Save user to DB

    return null;
}

//Login
export const login = async(email: string): Promise<boolean> => {

    //TODO: Check if user exists
    //TODO: Compare password
    //TODO: Generate JWT

    return false;
}