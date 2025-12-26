# --- Estágio 1: Base ---
FROM node:20-alpine AS base
RUN npm install -g pnpm

# --- Estágio 2: Builder ---
FROM base AS builder
WORKDIR /app

# Copia primeiro os arquivos de manifesto de dependência
COPY package.json pnpm-lock.yaml ./
# Instala TODAS as dependências (dev e prod) para o build
RUN pnpm install --frozen-lockfile

# Copia o restante do código-fonte (respeitando o .dockerignore)
COPY . .

# Executa o script de build completo
RUN pnpm run build

# --- Estágio 3: Produção (Runner) ---
FROM base AS production
WORKDIR /app

# Copia os artefatos do estágio 'builder'
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/dist ./dist
# Copia a node_modules de produção do builder
COPY --from=builder /app/node_modules ./node_modules

# Expõe a porta e define o comando de inicialização
EXPOSE 3000
CMD ["pnpm", "start"]