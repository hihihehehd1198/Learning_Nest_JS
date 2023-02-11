import { CustomerResolver } from '../customer/customer.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomerService } from './customer.service';
@Module({
  providers: [PrismaService, CustomerResolver, CustomerService],
})
export class CustomerModule {}
