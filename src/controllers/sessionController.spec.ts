import { SessionController } from '@/controllers/sessionController'; // Ajuste o caminho conforme sua estrutura
import { prisma } from '../database/prisma'; // Ajuste o caminho
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';

// 1. Mocks das dependências
jest.mock('../database/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

// Mock da configuração para não depender do arquivo real
jest.mock('@/config/auth', () => ({
  AuthConfig: {
    JWT: {
      secret: 'secret-test-key',
    },
  },
}));

describe('SessionController Unit Test', () => {
  let sessionController: SessionController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    sessionController = new SessionController();
    mockRequest = { body: {} };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('deve autenticar o usuário e retornar token com sucesso', async () => {
    // A. Arrange
    const userMock = {
      id: 'user-id-123',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed-password-db',
      role: 'admin',
    };

    mockRequest.body = {
      email: 'john@example.com',
      password: 'password123',
    };

    // 1. Prisma deve encontrar o usuário
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(userMock);
    // 2. Bcrypt deve dizer que a senha bate (true)
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    // 3. JWT deve gerar um token falso
    (jwt.sign as jest.Mock).mockReturnValue('fake-jwt-token');

    // B. Act
    await sessionController.login(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    // C. Assert
    // Verifica se gerou o token com os dados certos
    expect(jwt.sign).toHaveBeenCalledWith(
      { role: 'admin' }, 
      'secret-test-key', 
      expect.objectContaining({ subject: 'user-id-123' })
    );

    // Verifica a resposta final (deve ter token e user SEM senha)
    expect(mockResponse.json).toHaveBeenCalledWith({
      token: 'fake-jwt-token',
      user: {
        id: 'user-id-123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        // password não deve aparecer aqui
      },
    });
  });

  it('deve retornar erro 401 se o usuário não existir (Email incorreto)', async () => {
    mockRequest.body = {
      email: 'wrong@email.com',
      password: '123456',
    };

    // Prisma retorna null (usuário não encontrado)
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await sessionController.login(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );

    expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 401, // Corrigido de statusCode para status
        message: 'Email ou Senha Invalida', // Mensagem exata do seu código
      }),
    );
  });

  it('deve retornar erro 401 se a senha estiver incorreta', async () => {
    mockRequest.body = {
      email: 'john@example.com',
      password: 'wrong-password',
    };

    const userMock = {
      id: '1',
      email: 'john@example.com',
      password: 'hashed-password',
    };

    // 1. Usuário é encontrado
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(userMock);
    // 2. MAS a senha não bate (false)
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await sessionController.login(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );

    expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 401, // Corrigido de statusCode para status
      }),
    );
  });

  it('deve lançar erro de validação (Zod) se o email for inválido', async () => {
    mockRequest.body = {
      email: 'not-an-email', // Email inválido para o Zod
      password: '123',
    };

    await sessionController.login(mockRequest as Request, mockResponse as Response, mockNext);

    // Deve cair no catch e chamar o next com erro do Zod
    expect(mockNext).toHaveBeenCalled();
    // Opcional: verificar se não é um AppError, mas sim um ZodError (difícil de mockar tipo exato, mas chamar next já valida o catch)
  });
});