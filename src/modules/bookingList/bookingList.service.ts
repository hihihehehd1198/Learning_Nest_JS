import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ERROR_RESPONSE } from 'src/shared/utils';
import { BookingListDTO } from './bookingList.dto';
import { BookingList } from './bookingList.entity';

@Injectable()
export class BookingListService {
  constructor(private prismaService: PrismaService) {}
  async getAllBookingList(id?: number) {
    try {
      let res = await this.prismaService.bookingList.findMany({
        where: { id },
        select: {
          id: true,
          timeBooking: true,
          customer: true,
          customerPhone: true,
          serviceShop: true,
          user: true,
        },
      });
      return res;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }

  async updateBookingList(data: BookingListDTO) {
    try {
      const { id, userId, customerId, serviceShopId, ...rest } = data;

      const userFind = await this.prismaService.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!userFind) {
        ERROR_RESPONSE('khong tim thay nhan vien');
      }
      const customerFind = await this.prismaService.customer.findFirst({
        where: {
          id: customerId,
        },
      });

      if (!customerFind) {
        ERROR_RESPONSE('khong tim thay khach hang');
      }

      const serviceShopFind = await this.prismaService.serviceShop.findFirst({
        where: {
          id: serviceShopId,
        },
      });
      if (!serviceShopFind) {
        ERROR_RESPONSE('khong tim thay dich vu ');
      }

      const updateBookingList = await this.prismaService.bookingList.update({
        where: {
          id,
        },
        data: {
          ...rest,
          serviceShop: {
            connect: {
              id: serviceShopId,
            },
          },
          user: {
            connect: {
              id: serviceShopId,
            },
          },
          customer: {
            connect: {
              id: customerId,
            },
          },
        },
      });

      return updateBookingList;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async deleteBookingList(id?: number[]) {
    try {
      const resFind = await this.prismaService.bookingList.findMany({
        where: {
          id: {
            in: [...id],
          },
        },
      });
      if (!resFind) {
        ERROR_RESPONSE();
      }
      await this.prismaService.bookingList.deleteMany({
        where: {
          id: {
            in: [...id],
          },
        },
      });
      return 'ok';
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async createBooking(data: Omit<BookingListDTO, 'id'>) {
    try {
      const { userId, serviceShopId, customerId, ...rest } = data;
      const res = await this.prismaService.bookingList.create({
        data: {
          ...rest,
          serviceShop: {
            connect: {
              id: serviceShopId,
            },
          },
          user: {
            connect: {
              id: serviceShopId,
            },
          },
          customer: {
            connect: {
              id: customerId,
            },
          },
        },
      });
      return res;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
}
