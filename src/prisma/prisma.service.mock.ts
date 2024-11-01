import { PrismaService } from './prisma.service';

export const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  uRL: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

export const PrismaServiceMock = {
  provide: PrismaService,
  useValue: mockPrismaService,
};
