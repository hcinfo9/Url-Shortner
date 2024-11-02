import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../interface/user.interface';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';

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
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return omit(user, ['password']);
    }
    return null;
  }

  async login(createAuthDto: CreateAuthDto) {
    if (!createAuthDto.email || !createAuthDto.password) {
      throw new Error('Email and password must be provided');
    }
    const user = await this.validateUser(
      createAuthDto.email,
      createAuthDto.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createAuthDto: CreateAuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createAuthDto.email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: createAuthDto.email,
        password: hashedPassword,
      },
    });
    return omit(user, ['password']);
  }
}
