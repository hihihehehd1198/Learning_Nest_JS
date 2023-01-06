import { CategoryResolver } from './category.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryService } from './category.service';
@Module({
  providers: [PrismaService, CategoryResolver, CategoryService],
})
export class CategoryModule {}
