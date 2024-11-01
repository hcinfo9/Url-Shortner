// src/url/url.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UrlController],
  providers: [UrlService, JwtAuthGuard],
})
export class UrlModule {}
