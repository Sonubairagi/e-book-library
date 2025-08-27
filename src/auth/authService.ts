import type { NextFunction, Request, Response } from "express";

//Register
export const registerUser = async(req: Request, res: Response, next: NextFunction) => {

    //TODO: Check if user already exists
    //TODO: Hash password
    //TODO: Save user to DB

    res.send("User Registered");
}

//Login
export const login = async(req: Request, res: Response, next: NextFunction) => {

    //TODO: Check if user exists
    //TODO: Compare password
    //TODO: Generate JWT

    res.send("User Logged In");
}