import cors, { CorsOptions } from 'cors'

const allowedOrigins = process.env.FRONTEND_URL;

if (!allowedOrigins) {
    console.error("ERRO DE CONFIGURAÇÃO: FRONTEND_URL não está definido. Verifique seu arquivo .env.");
    // Em produção, você poderia lançar um erro ou usar uma lista estrita vazia
}

export const corsCOnfig: CorsOptions = {
     origin: allowedOrigins,
     credentials: true,

     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}

export const corsMiddleware = cors(corsCOnfig)