import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import * as AuthService from "./authService.ts";

const registerHandler = async (req: Request, res: Response, next: NextFunction) => {

  //Extract data from req
  const { name, email, password } = req.body;
  
  //Validate data
  if(!name || !email || !password) {
    const error =  createHttpError(400, "All fields are required");
    return next(error);
  }

  //Register User
  const savedUser = await AuthService.registerUser(req.body);

  if(!savedUser) {
    const error = createHttpError(500, "Failed to register user");
    return next(error);
  }

  //Send response
  res.status(201).json(savedUser);
}

const loginHandler = async (req: Request, res: Response, next: NextFunction) => {

  try {

  //EExtract data from req
  const { email, password} = req.body;

  //Validate data
  if(!email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  //Authenticate user and generate accessToken
  const accessToken = await AuthService.login(email, password);

  //Send response
  res.status(201).json({ accessToken });

  } catch(error: unknown) {
    if (error instanceof Error) {
      console.log("Error occured in loginHandler: ", error.message);
      const err = createHttpError(500, error.message);
      next(err);
    } else {
      next('An unknown error occurred');
    }
  }
  
}

export default { registerHandler, loginHandler };