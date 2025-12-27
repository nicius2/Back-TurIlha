# --- Estágio 1: Base ---
FROM node:20-alpine AS base
RUN apk add --no-cache openssl libc6-compat
RUN corepack enable
WORKDIR /app

# --- Estágio 2: Builder ---
FROM base AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copia prisma antes do generate
COPY prisma ./prisma
RUN npx prisma generate

# Copia resto do projeto
COPY . .

RUN pnpm build

# --- Estágio 3: Produção ---
FROM base AS production
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["pnpm", "start"]
