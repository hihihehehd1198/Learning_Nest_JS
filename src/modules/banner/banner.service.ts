import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BannerDto } from '../../auth/dto/banner/banner.dto';

@Injectable()
export class BannerService {
  constructor(private prismaService: PrismaService) {}

  async getBanner(id?: number) {
    try {
      return !id
        ? await this.prismaService.banner.findMany({})
        : await this.prismaService.banner.findMany({
            where: { id },
          });
    } catch (error) {
      throw new Error(error);
    }
  }
  async createBanner(data: Omit<BannerDto, 'id'>) {
    try {
      await this.prismaService.banner.create({
        data: {
          ...data,
        },
      });
      return {
        response: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateBanner(data: BannerDto) {
    const { id, ...body } = data;
    try {
      await this.prismaService.banner.update({
        where: {
          id,
        },
        data: {
          ...body,
        },
      });

      return {
        response: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteBanner(id: Array<number>) {
    try {
      await this.prismaService.banner.deleteMany({
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
