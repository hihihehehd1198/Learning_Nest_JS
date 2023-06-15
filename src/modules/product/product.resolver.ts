import { ProductService } from './product.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './product.entity';
import { ProductBodyDTO } from 'src/auth/dto/product/product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async findProduct(
    @Args('id', { type: () => Int, nullable: true })
    id?: number,
  ) {
    return (await id)
      ? this.productService.getAll(id)
      : this.productService.getAll();
  }
  @Mutation(() => Product)
  async createProduct(@Args('body') body: ProductBodyDTO) {
    const res = await this.productService.createProduct(body);
    console.log('resolver________', res);
    return res;
  }
  @Mutation(() => Product)
  async updateProduct(@Args('body') body: ProductBodyDTO) {
    return await this.productService.updateProduct(body);
  }
  @Mutation(() => String)
  async deleteProduct(@Args('id', { type: () => [Int] }) id: number[]) {
    return await this.productService.deleteProduct(id);
  }
}
