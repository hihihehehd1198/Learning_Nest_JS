import { ProductService } from './product.service';
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Product } from "./product.entity";
import { ProductBodyDTO } from 'src/auth/dto/product/product.dto';





@Resolver(() => Product)
export class ProductResolver {
    constructor(private productService: ProductService) {

    }

    @Query(() => [Product])
    async findProduct(
        @Args('id', { type: () => Int, nullable: true })
        id?: number,
    ) {
        return await id ? this.productService.getAll(id) : this.productService.getAll()
    }
    @Mutation(() => Product)
    async createProduct(@Args('data') data: ProductBodyDTO) {
        return await this.productService.createCategory(data)
    }
    @Mutation(() => Product)
    async updateProduct(@Args('data') data: ProductBodyDTO) {
        return await this.productService.updateCategory(data)
    }
    @Mutation(() => String)
    async deleteProduct(@Args('id', { type: () => [Int] }) id: number[]) {
        return await this.productService.deleteProduct(id)
    }
}
