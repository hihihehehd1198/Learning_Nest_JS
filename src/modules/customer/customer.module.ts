import { CustomerResolver } from './Customer.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomerService } from './Customer.service';
@Module({
  providers: [PrismaService, CustomerResolver, CustomerService],
})
export class CustomerModule {}
