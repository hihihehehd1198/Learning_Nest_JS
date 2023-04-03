import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common/decorators';
import { BrandDto } from '../../auth/dto/brands/brand.dto';
import { Brand } from './brand.entity';
import { ERROR_RESPONSE } from 'src/shared/utils';

@Injectable()
export class BrandService {
  constructor(private prismaService: PrismaService) { }

  async getBrand(id?: number) {
    try {
      return id
        ? await this.prismaService.brand.findMany({ where: { id } })
        : await this.prismaService.brand.findMany();
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async updateBrand(body: BrandDto) {
    const { id, ...data } = body;
    try {
      const res: Brand = await this.prismaService.brand.update({
        where: {
          id,
        },
        data,
      });
      return res
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async createBrand(data: Omit<BrandDto, 'id'>) {
    try {
      const res: Brand = await this.prismaService.brand.create({
        data,
      });
      return res
    } catch (error) {
      ERROR_RESPONSE(error);
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
      return 'ok'
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
}
