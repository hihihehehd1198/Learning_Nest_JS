import { BrandResolver } from '../brands/brand.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BrandService } from './brand.service';
@Module({
  providers: [PrismaService, BrandResolver, BrandService],
})
export class BrandModule {}
