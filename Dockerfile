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

# Copiar o restante do projeto (schema.prisma vem junto aqui)
COPY . .

RUN DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy" npx prisma generate

RUN pnpm tsc


# ===========================
# 2. RUNNER (PRODUÇÃO)
# ===========================
FROM node:20-alpine

USER root
RUN npm install -g pnpm

# Criar usuário não-root (boa prática)
# O node:20-alpine já vem com o usuário 'node', podemos usar ele ou manter o 1001
USER 1001

WORKDIR /app

# Copiar os artefatos do builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# ⚠️ IMPORTANTE: Copiar o node_modules do builder é o jeito mais fácil
# de garantir que o Prisma Client gerado venha junto.
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# No CMD, não precisamos gerar de novo se já copiamos o node_modules,
# mas manter o 'migrate deploy' aqui é arriscado em serverless.
# Vamos manter simples:
CMD ["pnpm", "start"]