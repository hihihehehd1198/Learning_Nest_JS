import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ServiceShopDTO } from '../../auth/dto/serviceShop/serviceShop.dto';
import { ServiceShop } from './serviceShop.entity';
import { ERROR_RESPONSE } from 'src/shared/utils';

@Injectable()
export class ServiceShopService {
  constructor(private prismaService: PrismaService) { }
  async createServiceShop(data: ServiceShopDTO) {
    try {
      const res: ServiceShop = await this.prismaService.serviceShop.create({
        data,
      });
      return res
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async getServiceShop(id?: number) {
    try {
      return id
        ? await this.prismaService.serviceShop.findMany({ where: { id } })
        : await this.prismaService.serviceShop.findMany({});
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async updateServiceShop(data: ServiceShopDTO) {
    const { id, ...body } = data;
    try {
      const res: ServiceShop = await this.prismaService.serviceShop.update({
        where: {
          id,
        },
        data: {
          ...body,
        },
      });
      return res
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async deleteServiceShop(id: number[]) {
    try {
      await this.prismaService.serviceShop.deleteMany({
        where: {
          id: {
            in: [...id],
          },
        },
      });
      return 'ok?'
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
}
