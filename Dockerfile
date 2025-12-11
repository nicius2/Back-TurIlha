# ===========================
# 1. BUILDER
# ===========================
FROM node:20-alpine AS builder

USER root

RUN npm install -g pnpm

WORKDIR /app

# Somente dependências (melhor cache)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar o restante do projeto
COPY . .

# 🔹 NÃO GERAR O PRISMA CLIENT AQUI
# (DATABASE_URL não existe no build)

# 🔹 Compilar TypeScript
RUN pnpm tsc


# ===========================
# 2. RUNNER (PRODUÇÃO)
# ===========================
FROM node:20-alpine

USER root
RUN npm install -g pnpm
USER 1001

WORKDIR /app

# Copiar somente o necessário
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# 🔹 Gerar Prisma Client + executar o app
CMD sh -c "pnpm prisma generate && pnpm start"
