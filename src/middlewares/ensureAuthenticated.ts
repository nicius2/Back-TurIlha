import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

interface TokenPayLoad {
     role: string
     sub: string
}


function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
     try {

          const authHeader = request.headers.authorization

          if(!authHeader) {
               throw new AppError(401, 'JTW token not found')
          }
          
          const [, token] = authHeader.split(" ")

          console.log('token: ', token)

     } catch (error) {
          next(error)
     }
}