import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = (await this.prisma.user.findUnique({
      where: { email },
    })) as User;
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.validateUser(
      createAuthDto.email,
      createAuthDto.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createAuthDto: CreateAuthDto) {
    const user = (await this.prisma.user.create({
      data: createAuthDto,
    })) as User;
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
