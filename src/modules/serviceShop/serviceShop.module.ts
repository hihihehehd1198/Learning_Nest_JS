import { ServiceShopResolver } from './serviceShop.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ServiceShopService } from './serviceShop.service';
@Module({
  providers: [PrismaService, ServiceShopResolver, ServiceShopService],
})
export class ServiceShopModule {}
