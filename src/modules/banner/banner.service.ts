import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BannerService {
  constructor(private prismaService: PrismaService) {}
}
