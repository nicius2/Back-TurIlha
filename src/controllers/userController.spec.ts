import { UserController } from '@/controllers/userController'; // Ajuste o caminho
import { prisma } from '@/database/prisma';
import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';

// 1. Mock das dependências externas
jest.mock('@/database/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('UserController Unit Test', () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  // executa antes de cada test 'it'
  beforeEach(() => {
    userController = new UserController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks(); // Limpa chamadas anteriores
  });

  it('deve registrar um usuário com sucesso', async () => {
    // A. Preparação (Arrange)
    mockRequest.body = {
      name: 'Teste',
      email: 'teste@email.com',
      password: '123456',
      confirmPassword: '123456',
    };

    // Simulando que o usuário NÃO existe no banco
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    // Simulando o hash da senha
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
    // Simulando a criação do usuário
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Teste',
      email: 'teste@email.com',
      password: 'hashed_password',
    });

    // B. Ação (Act)
    await userController.register(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    // C. Verificação (Assert)
    // Verifica se o prisma.create foi chamado corretamente
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Teste',
        email: 'teste@email.com',
        password: 'hashed_password',
      },
    });
    // Verifica se retornou status 201
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    // Verifica se retornou o JSON sem a senha
    expect(mockResponse.json).toHaveBeenCalledWith({
      user: {
        id: '1',
        name: 'Teste',
        email: 'teste@email.com',
        // password não deve estar aqui
      },
    });
  });

  it('deve retornar erro se o email já existe', async () => {
    mockRequest.body = {
      name: 'Teste',
      email: 'existente@email.com',
      password: '123456',
      confirmPassword: '123456',
    };

    // Simulando que o usuário JÁ existe
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: '1', email: 'existente@email.com' });

    await userController.register(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    // Verifica se chamou o next com o AppError
    expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 409, // Corrigido de statusCode para status
        message: 'Este e-mail já está em uso.',
      }),
    );
    });

    it('deve cair no catch/next se houver erro de validação Zod', async () => {
    mockRequest.body = {
        name: 'Te', // Nome muito curto, erro do Zod
        email: 'invalido',
        password: '123',
        confirmPassword: '321'
    };

    await userController.register(mockRequest as Request, mockResponse as Response, mockNext);

    // O Zod lança erro, então deve cair no next
    expect(mockNext).toHaveBeenCalled();
  });
});