# --- Estágio 1: Base ---
# Define a imagem base e configura o pnpm
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# --- Estágio 2: Dependências ---
# Foca em baixar as dependências para cache
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch

# --- Estágio 3: Builder ---
# Instala todas as dependências e constrói o projeto
FROM base AS builder
WORKDIR /app
COPY . .
# Usa o cache do estágio 'deps' e instala tudo
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Executa o script de build completo (prisma, tsc, tsc-alias)
RUN pnpm run build

# --- Estágio 4: Produção (Runner) ---
# Cria a imagem final, enxuta e otimizada
FROM base AS production
WORKDIR /app

# Copia os artefatos do estágio 'builder'
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/dist ./dist

# Instala apenas as dependências de produção
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Expõe a porta e define o comando de inicialização
EXPOSE 3000
CMD ["pnpm", "start"]