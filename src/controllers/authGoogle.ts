import { Request, Response, NextFunction } from "express";
import z from "zod";
import { AuthConfig } from "@/config/auth";
import { prisma } from "@/database/prisma";
import { firebaseAdmin } from "@/lib/firebaseAdmin";
import jwt from 'jsonwebtoken'


const bodySchema = z.object({
  access_token: z.string(),
});

export async function authenticateWithGoogle(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { access_token } = bodySchema.parse(request.body);

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(access_token);

    const { uid, email, email_verified, name } = decodedToken;

    if (!email) {
      throw new Error("Email não encontrado no token");
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        googleId: uid,
      },
      create: {
        name: name || "Usuário",
        email,
        googleId: uid,
      },
    });

      const { secret } = AuthConfig.JWT;

      const token = jwt.sign({ role: user.role ?? "customer" }, secret, {
        subject: user.id,
        expiresIn: "1d",
      });

      return response.json({ token, user });
  } catch (error) {
    next(error);
  }
}
