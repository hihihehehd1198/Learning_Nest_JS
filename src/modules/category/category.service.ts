import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CategoryDTO } from '../../auth/dto/category/category.dto';
import { Category } from './category.entity';
import { BrandDto } from '../../auth/dto/brands/brand.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) { }

  async createCategory(data: Omit<CategoryDTO, 'id'>) {
    try {
      const res: Category = await this.prismaService.category.create({
        data,
      });
      return res
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateCategory(data: CategoryDTO) {
    try {
      const { id, ...body } = data;
      const res: Category = await this.prismaService.category.update({
        where: {
          id,
        },
        data: {
          ...body,
        },
      });
      return res
    } catch (error) {
      throw new Error(error);
    }
  }
  async getCategory(id: number) {
    try {
      return id
        ? await this.prismaService.category.findMany({
          where: {
            id,
          },
        })
        : await this.prismaService.category.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteCategory(id: number[]) {
    try {
      await this.prismaService.category.deleteMany({
        where: {
          id: {
            in: [...id],
          },
        },
      });
      return 'ok'
    } catch (error) {
      throw new Error(error);
    }
  }
}
