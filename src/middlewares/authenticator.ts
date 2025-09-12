import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import pkg from 'jsonwebtoken';
const { verify } = pkg;

export interface AuthRequest extends Request {
    userId: string;
}

const authenticator = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('Authorization');
    if (!token) {
        return next(createHttpError(401, 'Unauthorized: No token provided'));
    }

    try {
        
        // Verify token (this is a placeholder, implement your own logic)
        const parsedToken = token.split(' ')[1]; // Assuming Bearer token
        
        const decodedTokenDetails = verify(parsedToken as string, process.env.JWT_SECRET || 'your_jwt_secret_key');
        console.log("Decoded Token Details:", decodedTokenDetails);

        // You can attach user info to req object if needed
        const _req = req as AuthRequest;
        _req.userId = decodedTokenDetails.sub as string;
        console.log("User ID from token:", _req.userId);
        next();
        
    } catch (error) {
        return next(createHttpError(401, 'Unauthorized: Invalid token'));
    }
}

export default authenticator;