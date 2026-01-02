
# Back-End TurIlha API 🌴

Bem-vindo à API do Back-End TurIlha! Este projeto é o sistema de back-end para uma aplicação de turismo, responsável por gerenciar dados de pontos turísticos, eventos, restaurantes e pela autenticação de usuários.

## ✨ Tecnologias Utilizadas

Este projeto foi construído com um conjunto moderno de tecnologias para garantir performance e segurança:

- **Node.js**: Ambiente de execução para o JavaScript no servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Express.js**: Framework para construção de APIs RESTful.
- **Prisma**: ORM de última geração para interagir com o banco de dados.
- **PostgreSQL**: Banco de dados relacional robusto e confiável.
- **JWT (jsonwebtoken)**: Para geração de tokens de autenticação.
- **Zod**: Para validação de schemas e dados de entrada.
- **bcryptjs**: Para hashing e segurança de senhas.
- **Helmet**: Para adicionar uma camada de segurança contra vulnerabilidades web comuns.
- **CORS**: Para gerenciar permissões de acesso de diferentes origens.
- **tsx**: Para rodar a aplicação em TypeScript de forma otimizada em desenvolvimento.
- **pnpm**: Gerenciador de pacotes rápido e eficiente.
- **Jest**: Biblioteca para testes automatizados

- CI/CD para rodar os testes unitarios, eslint e fazer deploy no railway  

---

## 🚀 Começando

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### **Pré-requisitos**

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/installation)
- Uma instância do [PostgreSQL](https://www.postgresql.org/download/) rodando.

### **1. Clonando o Repositório**

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd Back-TurIlha
```

### **2. Instalando as Dependências**

Use o `pnpm` para instalar todas as dependências do projeto.

```bash
pnpm install
```

### **3. Configurando o Ambiente**

Crie uma cópia do arquivo de exemplo `.env.example` e renomeie para `.env`.

```bash
cp .env.example .env
```

Agora, abra o arquivo `.env` e preencha as variáveis com suas informações.

```env
# URL de conexão com seu banco de dados PostgreSQL
# Formato: postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO
DATABASE_URL="postgresql://docker:docker@localhost:5432/turilha?schema=public"

# Porta em que a API irá rodar
PORT=3333

# Ambiente de execução (dev, test, production)
NODE_ENV=dev

# Chave secreta para gerar os tokens JWT (use um valor forte e aleatório)
JWT_SECRET="SUA_CHAVE_SECRETA_AQUI"

# URL do front-end que terá permissão para acessar a API
FRONTEND_URL="http://localhost:5173"
```

### **4. Migração do Banco de Dados**

Execute o comando abaixo para que o Prisma crie as tabelas no seu banco de dados com base no `schema.prisma`.

```bash
pnpm exec prisma migrate dev
```

## ▶️ Rodando a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com hot-reload), execute:

```bash
pnpm run dev
```

A API estará disponível em `http://localhost:3333` (ou na porta que você definiu no `.env`).

---

## 🗺️ Endpoints da API

Aqui estão as rotas disponíveis na API:

### Autenticação

| Método | Rota                | Descrição                                 |
| :----- | :------------------ | :---------------------------------------- |
| `POST` | `/user/register`    | Registra um novo usuário.                 |
| `POST` | `/session/login`    | Autentica um usuário e retorna um token JWT. |

### Cards (Pontos Turísticos)

| Método | Rota                | Descrição                                         |
| :----- | :------------------ | :------------------------------------------------ |
| `GET`  | `/cards`            | Retorna todos os cards cadastrados.               |
| `GET`  | `/cards/paisagens`  | Retorna todos os cards do tipo "Paisagem".        |
| `GET`  | `/cards/eventos`    | Retorna todos os cards do tipo "Evento".          |
| `GET`  | `/cards/restaurantes`| Retorna todos os cards do tipo "Restaurante".    |

---
