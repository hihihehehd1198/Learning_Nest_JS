import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common/decorators';
import { BrandDto } from '../../auth/dto/brands/brand.dto';

@Injectable()
export class BrandService {
  constructor(private prismaService: PrismaService) {}

  async getBrand(id?: number) {
    try {
      return id
        ? await this.prismaService.brand.findMany({ where: { id } })
        : await this.prismaService.brand.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateBrand(body: BrandDto) {
    const { id, ...data } = body;
    try {
      await this.prismaService.brand.update({
        where: {
          id,
        },
        data,
      });
      return {
        response: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async createBrand(data: Omit<BrandDto, 'id'>) {
    try {
      await this.prismaService.brand.create({
        data,
      });
      return {
        response: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteBrand(id: number[]) {
    try {
      await this.prismaService.brand.deleteMany({
        where: {
          id: {
            in: [...id],
          },
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
