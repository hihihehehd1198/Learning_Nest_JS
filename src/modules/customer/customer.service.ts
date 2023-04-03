import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common/decorators';
import { CustomerDto } from '../../auth/dto/customer/customer.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Customer } from '../customer/customer.entity';
import * as argon from 'argon2';
import { ERROR_RESPONSE } from 'src/shared/utils';
@Injectable()
export class CustomerService {
  constructor(
    // private jwtService: JwtService,
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) { }

  async createCustomerAccount(data: CustomerDto) {
    const { hashedPassword, ...body } = data;
    const Password = await argon.hash(hashedPassword);
    try {
      const res:Customer = await this.prismaService.customer.create({
        data: {
          hashedPassword: Password,
          ...body,
        },
      });
      return res;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async updateCustomerAccount(data: CustomerDto) {
    try {
      const res: Customer = await this.prismaService.customer.update({
        where: {
          id: data.id,
        },
        data: {
          ...data,
        },
      });
      return res;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async deleteCustomerAccount(id: number[]) {
    try {
      await this.prismaService.customer.deleteMany({
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
  async getAllCustomerAccount(id?: number) {
    try {
      if (!id) {
        return await this.prismaService.customer.findMany();
      }
      return await this.prismaService.customer.findMany({
        where: { id },
      });
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
}
