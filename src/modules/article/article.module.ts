import { ArticleResolver } from './Article.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ArticleService } from './article.service';
@Module({
  providers: [PrismaService, ArticleResolver, ArticleService],
})
export class ArticleModule {}
