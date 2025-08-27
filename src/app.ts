import express from "express";
import createHttpError from "http-errors";
import globalErrorHandler from "./middlewares/globleErrorHandler.ts";

const app = express();

//Routes
app.get("/", (req, res) => {
    const error = createHttpError(400, "FuckYou!");
    throw error;
    res.json({ message: "Welcome to EBL!" });
});

//Global Error Handling
app.use(globalErrorHandler);

export default app;
