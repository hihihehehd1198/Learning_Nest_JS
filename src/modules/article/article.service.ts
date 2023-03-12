import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleDto } from '../../auth/dto/article/article.dto';

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
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateArticle(data: ArticleDto) {
    try {
      await this.prismaService.article.update({
        where: {
          id: data.id,
        },
        data: {
          body: data.body,
          title: data.title,
        },
      });
      return {
        response: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async createArticle(data: ArticleDto) {
    try {
      await this.prismaService.article.create({
        data,
      });
      return {
        response: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteArticle(listId: number[]) {
    try {

      //asdasd
      await this.prismaService.article.deleteMany({
        where: {
          id: {
            in: [...listId]
          }
        },
      });
      return {
        response: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
