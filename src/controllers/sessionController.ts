import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import * as bcrypt from 'bcryptjs'
import { prisma } from '../database/prisma'
import { AppError } from '@/utils/AppError'
import { AuthConfig } from '@/config/auth'
import jwt from 'jsonwebtoken'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "senha deve ser maior que 6 digitos"),
});

class SessionController {
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(request.body);

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new AppError(401, "Email ou Senha Invalida");
      }

      const passwordCompare = await bcrypt.compare(password, user.password || "");

      if (!passwordCompare) {
        throw new AppError(401, "Email ou Senha Invalida ");
      }

      const { secret } = AuthConfig.JWT;

      const token = jwt.sign({ role: user.role ?? "customer" }, secret, {
        subject: user.id,
        expiresIn: "1d",
      });

      // separando a senha e o restante do corpo do usuario cadastrado
      const { password: hashedPassword, ...userWithoutPassword } = user;

      // mostrando o token e o usuario
      return response.json({ token, user: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  }
}

export { SessionController };
