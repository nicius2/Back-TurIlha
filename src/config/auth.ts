import { env } from "@/env";

export const AuthConfig = {
     JWT: {
          secret: env.JWT_SECRET,
          expiresIn: '1d'
     }
} 