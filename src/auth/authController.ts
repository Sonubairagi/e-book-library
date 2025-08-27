import type { NextFunction, Request, Response } from "express";

const registerHandler = (req: Request, res: Response, nex: NextFunction) => {
  // Registration logic here

  //TODO: Extract data from req
  //TODO: Validate data
  //TODO: Send response

  res.json("User registered");
}

const loginHandler = (req: Request, res: Response, nex: NextFunction) => {
  // Login logic here

  //TODO: Extract data from req
  //TODO: Validate data
  //TODO: Send response

  res.json("User logged in");
}

export default { registerHandler, loginHandler };