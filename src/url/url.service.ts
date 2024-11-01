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
        ...createUrlDto,
        shortUrl: nanoid(6),
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.uRL.findMany({
      where: { userId },
    });
  }

  async findOne(shortUrl: string) {
    return this.prisma.uRL.findUnique({
      where: { shortUrl },
    });
  }

  async update(id: string, originalUrl: string) {
    return this.prisma.uRL.update({
      where: { id },
      data: { originalUrl },
    });
  }

  async remove(id: string) {
    return this.prisma.uRL.delete({
      where: { id },
    });
  }
}
