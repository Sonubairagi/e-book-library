import type { User } from "./authType.ts";
import authRepository from "./authRepository.ts";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import { config } from "../config/config.ts";

//Register
export const registerUser = async(user: User): Promise<User | null> => {
    
    //Check if user already exists
    const isUserExists = await authRepository.getUserByEmail(user.email);
    if(isUserExists) {
        const error = new Error("User already exists");
        throw error;
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    //Save user
    const savedUser = await authRepository.saveUser({
        name: user.name,
        email: user.email,
        password: hashedPassword
    });

    return savedUser;
}

//Login
export const login = async(email: string, password: string): Promise<string | null> => {

    //Check if user exists
    const user = await authRepository.getUserByEmail(email);
    if(!user) {
        const error = new Error("User does not exist");
        throw error;
    }

    //Compare password
    const isMatch = await bcrypt.compare(password, user?.password);
    if(!isMatch) {
        const error = new Error("Invalid credentials");
        throw error;
    }

    //TODO: Generate JWT
    const accessToken = await generateAccessToken(user._id as string);

    return accessToken;
}

export async function generateAccessToken(userId: string): Promise<string | null> {
    let accessToken = null;
    try {
        const { sign } = pkg;
        accessToken = sign({sub: userId}, config.jwtSecret as string, {
        expiresIn: "7d",
        algorithm: "HS256"
    })
    } catch (error) {
        console.log(error);
        
    }
    return accessToken;
}

// const isUserExists = async(email: string): Promise<User | null> => {
//     const isUserExists = await authRepository.getUserByEmail(email);
//     if(isUserExists) {
//         const error = new Error("User already exists");
//         throw error;
//     }

//     return isUserExists;
// }

// const generateRandomSalt = async () => {
//     return crypto.randomBytes(16).toString("hex");
// }

// async function hashPassword(password: string): Promise<string> {
//     const scryptAsync = promisify(crypto.scrypt);
//     const salt = await generateRandomSalt();
//     const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
//     return `${salt}:${derivedKey.toString("hex")}`
// }