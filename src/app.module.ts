import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UrlModule,
    PrismaModule,
    PrometheusModule.register(),
  ],
})
export class AppModule {}
