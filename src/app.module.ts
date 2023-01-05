import { BannerModule } from './modules/banner/banner.module';
import { AccessTokenGuards } from './auth/guards/accessToken.guard';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { CustomerModule } from './modules/customer/customer.module';
import { ArticleModule } from './modules/article/article.module';
import { BrandModule } from './modules/brands/brand.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    UserModule,
    CustomerModule,
    ArticleModule,
    BannerModule,
    BrandModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
