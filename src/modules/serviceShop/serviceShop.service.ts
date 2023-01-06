import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ServiceShopDTO } from '../../auth/dto/serviceShop/serviceShop.dto';

@Injectable()
export class ServiceShopService {
  constructor(private prismaService: PrismaService) {}
  async createServiceShop(data: ServiceShopDTO) {
    try {
      await this.prismaService.serviceShop.create({
        data,
      });
      return {
        response: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getServiceShop(id?: number) {
    try {
      return id
        ? await this.prismaService.serviceShop.findMany({ where: { id } })
        : await this.prismaService.serviceShop.findMany({});
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateServiceShop(data: ServiceShopDTO) {
    const { id, ...body } = data;
    try {
      await this.prismaService.serviceShop.update({
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
  async deleteServiceShop(id: number[]) {
    try {
      await this.prismaService.serviceShop.deleteMany({
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
