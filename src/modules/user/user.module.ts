import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from './user.service';
@Module({
    providers: [
        PrismaService,
        UserResolver,
        UserService
    ],
})
export class UserModule { }
