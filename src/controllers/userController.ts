import { Request, Response, NextFunction } from 'express'

class User {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      // Lógica para criar um usuário
      response.status(201).json({ message: 'User created successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export { User }
