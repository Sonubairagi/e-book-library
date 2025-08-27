import express from "express";
import { registerHandler } from "./authController.ts";

const authRouter = express.Router();

authRouter.post("/register", registerHandler);

export default authRouter;