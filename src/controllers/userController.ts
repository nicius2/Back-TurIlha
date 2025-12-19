import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as bcrypt from 'bcryptjs';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';

const registerSchema = z.object({
  name: z.string().min(3, 'O nome é obrigatório.'),
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'],
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

}

export { UserController };