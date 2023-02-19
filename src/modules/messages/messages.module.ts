import { MessageResolver } from './messages.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MessageService } from './messages.service';
@Module({
  providers: [PrismaService, MessageResolver, MessageService],
})
export class MessageModule {}
