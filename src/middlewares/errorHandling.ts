import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod/v4";

export function errorHandling(
     error: any,
     request: Request,
     response: Response,
     next: NextFunction
) {
     if(error instanceof AppError) {
          return response.status(error.status).json({message: error.message})
     }     

     if(error instanceof ZodError) {
          return response.status(400).json({
               message: 'Validation Error',
               issues: error.issues.map(({path, message}) => ({
                field: path.join("."),
                message
            }))
          })
     }
     return response.status(500).json({message: "Internal Server Error"})
}