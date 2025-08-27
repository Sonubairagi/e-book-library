import type { NextFunction, Request, Response } from "express";

const registerHandler = (req: Request, res: Response, nex: NextFunction) => {
  // Registration logic here
  res.json("User registered");
}

export { registerHandler };