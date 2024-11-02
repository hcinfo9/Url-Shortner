// src/url/url.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Res,
  Optional,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { User } from '../interface/user.interface';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(
    @Body() createUrlDto: CreateUrlDto,
    @Req() @Optional() req?: Request & { user?: User },
  ) {
    const userId = req?.user?.sub || null;
    const tenantId = req?.user?.tenantId || null;
    return this.urlService.create(createUrlDto, userId, tenantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request & { user: User }) {
    return this.urlService.findAll(req.user.sub, req.user.tenantId);
  }

  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const url = await this.urlService.findOne(shortUrl);
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('originalUrl') originalUrl: string,
  ) {
    return this.urlService.update(id, originalUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.urlService.remove(id);
  }
}
