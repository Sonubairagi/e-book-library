import express from "express";
import authHandler from "./authController.ts";

const authRouter = express.Router();

authRouter.post("/register", authHandler.registerHandler);
authRouter.post("/login", authHandler.loginHandler);

export default authRouter;