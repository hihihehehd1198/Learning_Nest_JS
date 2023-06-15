import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BannerDto } from '../../auth/dto/banner/banner.dto';
import { Banner } from './banner.entity';
import { ERROR_RESPONSE } from 'src/shared/utils';

@Injectable()
export class BannerService {
  constructor(private prismaService: PrismaService) {}

  async getBanner(id?: number) {
    try {
      return await this.prismaService.banner.findMany({
        where: { id },
      });
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async createBanner(data: Omit<BannerDto, 'id'>) {
    try {
      const res: Banner = await this.prismaService.banner.create({
        data: {
          ...data,
        },
      });
      return res;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async updateBanner(data: BannerDto) {
    const { id, userId, ...body } = data;
    try {
      console.log('userId', userId);
      const findUser = await this.prismaService.banner.findFirst({
        where: {
          id,
        },
      });
      if (!findUser) {
        throw new Error('khong tim thay ban ghi');
      }
      const res = await this.prismaService.banner.update({
        where: {
          id,
        },
        data: {
          ...body,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      console.log(res);
      return res;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async deleteBanner(id: Array<number>) {
    try {
      const resFind = await this.prismaService.banner.findMany({
        where: {
          id: {
            in: [...id],
          },
        },
      });
      console.log(resFind);
      if (!resFind.length) {
        throw new Error('khong tim thay ban ghi');
      }
      await this.prismaService.banner.deleteMany({
        where: {
          id: {
            in: [...id],
          },
        },
      });
      return 'ok?';
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
}
