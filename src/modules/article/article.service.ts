import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleDto } from '../../auth/dto/article/article.dto';
import { ERROR_RESPONSE } from 'src/shared/utils';

@Injectable()
export class ArticleService {
  constructor(private prismaService: PrismaService) { }
  async getArticle(id?: number) {
    try {
      if (!id) {
        return this.prismaService.article.findMany();
      }
      return this.prismaService.article.findMany({
        where: {
          id,
        },
      });

      // throw new Error('cmm')
    } catch (error) {
      ERROR_RESPONSE(error);//test
    }
  }
  async updateArticle(data: ArticleDto) {
    try {
      const res: Article = await this.prismaService.article.update({
        where: {
          id: data.id,
        },
        data: {
          body: data.body,
          title: data.title,
        },
      });
      return res;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async createArticle(data: ArticleDto) {
    try {
      const res: Article = await this.prismaService.article.create({
        data,
      });
      return res;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async deleteArticle(listId: number[]) {
    try {
      //asdasd
      await this.prismaService.article.deleteMany({
        where: {
          id: {
            in: [...listId],
          },
        },
      });
      return 'ok?';
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
}
