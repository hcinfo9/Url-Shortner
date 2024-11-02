import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { PrismaServiceMock } from '../src/prisma/prisma.service.mock';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from '../src/auth/dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaServiceMock, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user', async () => {
    PrismaServiceMock.useValue.user.findUnique.mockReturnValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const result = await service.validateUser('test@example.com', 'password');
    expect(result).toHaveProperty('email');
    expect(result.email).toBe('test@example.com');
  });

  it('should login a user', async () => {
    const createAuthDto: CreateAuthDto = {
      email: 'test@example.com',
      password: 'password',
    };
    PrismaServiceMock.useValue.user.findUnique.mockReturnValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jwtService.sign = jest.fn().mockReturnValue('token');

    const result = await service.login(createAuthDto);
    expect(result).toHaveProperty('access_token');
    expect(result.access_token).toBe('token');
  });

  it('should register a user', async () => {
    const createAuthDto: CreateAuthDto = {
      email: 'test@example.com',
      password: 'password',
    };
    PrismaServiceMock.useValue.user.create.mockReturnValue({
      id: '1',
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.register(createAuthDto);
    expect(result).toHaveProperty('email');
    expect(result.email).toBe('test@example.com');
  });
});
