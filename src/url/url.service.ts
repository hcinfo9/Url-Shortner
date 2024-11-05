import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUrlDto: CreateUrlDto, userId: string) {
    return this.prisma.uRL.create({
      data: {
        originalUrl: createUrlDto.originalUrl,
        shortUrl: nanoid(6),
        userId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.uRL.findMany({
      where: { userId },
    });
  }

  async findOne(shortUrl: string) {
    const url = await this.prisma.uRL.findUnique({
      where: { shortUrl },
    });

    if (url) {
      await this.prisma.uRL.update({
        where: { shortUrl },
        data: { clicks: url.clicks + 1 },
      });
      url.clicks += 1;
    }

    return url;
  }

  async update(id: string, originalUrl: string) {
    return this.prisma.uRL.update({
      where: { id },
      data: { originalUrl },
    });
  }

  async remove(id: string) {
    return this.prisma.uRL.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
