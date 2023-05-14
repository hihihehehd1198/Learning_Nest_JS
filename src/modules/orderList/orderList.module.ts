import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderResolver } from "./orderList.resolver";
import { OrderService } from "./orderList.service";



@Module({
    providers: [
        PrismaService,
        OrderResolver,
        OrderService,
    ]
})
export class OrderModule {

}