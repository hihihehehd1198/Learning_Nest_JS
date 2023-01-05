import { BannerResolver } from './Banner.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BannerService } from './banner.service';
@Module({
  providers: [PrismaService, BannerResolver, BannerService],
})
export class BannerModule {}
