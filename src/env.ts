import { z } from 'zod';
import "dotenv/config";


const envSchema = z.object({
  DATABASE_URL: z.string().url(), // Valida que DATABASE_URL é uma URL válida
  PORT: z.coerce.number().default(3000), // Converte a variável para número e define padrão 3000
});

export const env = envSchema.parse(process.env);