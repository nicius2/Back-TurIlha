import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../database/prisma';
import { AppError } from '../utils/AppError';
import { env } from '../env';

const registerSchema = z.object({
  name: z.string().min(3, 'O nome é obrigatório.'),
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

const loginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

class UserController {
  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password } = registerSchema.parse(request.body);

      const userExists = await prisma.user.findUnique({ where: { email } });

      if (userExists) {
        throw new AppError(409, 'Este e-mail já está em uso.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const { password: _, ...userWithoutPassword } = user;

      return response.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(request.body);

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new AppError(401, 'Credenciais inválidas.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AppError(401, 'Credenciais inválidas.');
      }

      const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, {
        expiresIn: '1d',
      });

      const { password: _, ...userWithoutPassword } = user;

      return response.json({ user: userWithoutPassword, token });
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };