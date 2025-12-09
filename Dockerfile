# ===========================
# 1. BUILDER
# ===========================
FROM node:20-alpine AS builder

USER root

RUN npm install -g pnpm

WORKDIR /app

# Somente dependências (cache melhor)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar o restante do projeto
COPY . .

# 🔹 Gerar o Prisma Client
RUN pnpm prisma generate

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

# Copiar apenas o necessário
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "start"]
