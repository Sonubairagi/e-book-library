import type { NextFunction, Request, Response } from "express";
import type { HttpError } from "http-errors";
import { config } from "../config/config.ts";

const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const stackTrace = config.environment === "development" ? err.stack : "";

    console.log("Error occured inside globalErrorHandler: ", message);

    return res.status(statusCode).json({
        message: message,
        errorStack: stackTrace,
    });
    next();
};

export default globalErrorHandler;
