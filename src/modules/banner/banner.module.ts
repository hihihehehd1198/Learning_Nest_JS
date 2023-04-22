import { BannerResolver } from '../banner/banner.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BannerService } from './banner.service';
import { AWSService } from 'src/shared/aws.service';
@Module({
  providers: [PrismaService, BannerResolver, BannerService, AWSService],
})
export class BannerModule { }
