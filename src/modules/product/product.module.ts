import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";



@Module({
    providers: [
        PrismaService,
        ProductResolver,
        ProductService,
    ]
})
export class ProductModule {

}