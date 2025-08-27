import express from "express";
import globalErrorHandler from "./middlewares/globleErrorHandler.ts";
import authRouter from "./auth/authRouter.ts";
import bookRouter from "./book/bookRouter.ts";

const app = express();

//Middlewares
// app.use(cors())
app.use(express.json())

//Routes
//Auth Router
app.use("/api/v1/auth", authRouter);
//Book Router
app.use("/api/v1/books", bookRouter);

//Global Error Handling
app.use(globalErrorHandler);

export default app;
