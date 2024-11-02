import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from '../src/url/url.service';
import { PrismaServiceMock } from '../src/prisma/prisma.service.mock';
import { CreateUrlDto } from '../src/url/dto/create-url.dto';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService, PrismaServiceMock],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a URL', async () => {
    const createUrlDto: CreateUrlDto = { originalUrl: 'https://example.com' };
    PrismaServiceMock.useValue.uRL.create.mockReturnValue({
      id: '1',
      originalUrl: 'https://example.com',
      shortUrl: 'abc123',
      userId: 'user1',
      tenantId: 'tenant1',
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.create(createUrlDto, 'user1');
    expect(result).toHaveProperty('shortUrl');
    expect(result.shortUrl).toHaveLength(6);
  });

  it('should find all URLs for a user', async () => {
    PrismaServiceMock.useValue.uRL.findMany.mockReturnValue([
      {
        id: '1',
        originalUrl: 'https://example.com',
        shortUrl: 'abc123',
        userId: 'user1',
        tenantId: 'tenant1',
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const result = await service.findAll('user1');
    expect(result).toHaveLength(1);
    expect(result[0].userId).toBe('user1');
  });

  it('should find one URL and increment clicks', async () => {
    PrismaServiceMock.useValue.uRL.findUnique.mockReturnValue({
      id: '1',
      originalUrl: 'https://example.com',
      shortUrl: 'abc123',
      userId: 'user1',
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    PrismaServiceMock.useValue.uRL.update.mockReturnValue({
      id: '1',
      originalUrl: 'https://example.com',
      shortUrl: 'abc123',
      userId: 'user1',

      clicks: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.findOne('abc123');
    expect(result).toHaveProperty('clicks');
    expect(result.clicks).toBe(1);
  });

  it('should update a URL', async () => {
    PrismaServiceMock.useValue.uRL.update.mockReturnValue({
      id: '1',
      originalUrl: 'https://newexample.com',
      shortUrl: 'abc123',
      userId: 'user1',
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.update('1', 'https://newexample.com');
    expect(result.originalUrl).toBe('https://newexample.com');
  });

  it('should delete a URL', async () => {
    PrismaServiceMock.useValue.uRL.update.mockReturnValue({
      id: '1',
      originalUrl: 'https://example.com',
      shortUrl: 'abc123',
      userId: 'user1',
      tenantId: 'tenant1',
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    });

    const result = await service.remove('1');
    expect(result.id).toBe('1');
    expect(result.deletedAt).not.toBeNull();
  });
});
