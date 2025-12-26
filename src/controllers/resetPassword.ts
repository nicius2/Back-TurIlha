import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import bcrypt from "bcryptjs";
import z from "zod";
import crypto from "crypto";
import { AppError } from "@/utils/AppError";
import { enviarEmailReset } from "@/services/mailServices";

const schemaEmail = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
});
const schemaResetPasswordBody = z.object({
  newPassword: z.string().min(6),
  confirmNewPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "As senhas não coincidem",
  path: ["confirmNewPassword"],
});

const schemaResetPasswordQuery = z.object({
  token: z.string(),
});

class ResetPassword {
  async ForgotPassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { email } = schemaEmail.parse(request.body);

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new AppError(401, "Usuário não encontrado");
      }

      if (!user.password && user.googleId) {
        throw new AppError(
          401,
          "Sua conta é vinculada ao Google. Faça login com o botão do Google."
        );
      }

      const token = crypto.randomBytes(32).toString("hex");
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: token,
          resetTokenExpires: now,
        },
      });

      await enviarEmailReset(user.email, token);

      return response.json({ message: "E-mail de recuperação enviado." });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { token } = schemaResetPasswordQuery.parse(request.query);
      const { newPassword } = schemaResetPasswordBody.parse(request.body);

      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpires: {
            gte: new Date(),
          },
        },
      });

      if (!user) {
        throw new AppError(401, "Token inválido ou expirado");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const isPassword = await bcrypt.compare(newPassword, user.password || "");

      if (isPassword) {
        throw new AppError(401, "A nova senha não pode ser a mesma que a anterior");
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,        
          resetTokenExpires: null, 
        },
      });

      return response.json({ message: "Senha redefinida com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export { ResetPassword };
