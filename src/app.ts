import express from "express";
import globalErrorHandler from "./middlewares/globleErrorHandler.ts";
import authRouter from "./auth/authRouter.ts";
import bookRouter from "./book/bookRouter.ts";

const app = express();

try {
    //Middlewares
    // app.use(cors())
    app.use(express.json())

    //Routes
    //Auth Router
    app.use("/api/v1/auth", authRouter);
    //Book Router
    app.use("/api/v1/book", bookRouter);

    //Global Error Handling
    app.use(globalErrorHandler);
} catch (error) {
    console.log("Error in app.ts", error);
}

export default app;
