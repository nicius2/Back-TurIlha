import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { AppError } from '../utils/AppError'
import { env } from '../env'

interface TokenPayload {
  id: string
  role: string
  iat: number
  exp: number
}

export function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers

  if (!authorization) {
    throw new AppError('Unauthorized', 401)
  }

  const token = authorization.split(' ')[1]

  try {
    const data = jwt.verify(token, env.JWT_SECRET)
    const { id, role } = data as TokenPayload
    request.userId = id
    request.userRole = role
    return next()
  } catch {
    throw new AppError('Unauthorized', 401)
  }
}
