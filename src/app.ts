import express from "express";
import globalErrorHandler from "./middlewares/globleErrorHandler.ts";
import authRouter from "./auth/authRouter.ts";

const app = express();

//Middlewares
// app.use(cors())
app.use(express.json())

//Routes
app.use("/api/v1/auth", authRouter);

//Global Error Handling
app.use(globalErrorHandler);

export default app;
