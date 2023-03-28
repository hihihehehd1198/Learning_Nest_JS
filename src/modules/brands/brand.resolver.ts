import { BrandService } from './brand.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Brand } from './brand.entity';
import { BrandDto } from '../../auth/dto/brands/brand.dto';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(private brandService: BrandService) { }
  @Query(() => [Brand])
  async getAllBrand(@Args('id', { nullable: true }) id?: number) {
    return await this.brandService.getBrand(id);
  }

  @Mutation(() => Brand)
  async updateBrand(@Args('body') body: BrandDto) {
    return await this.brandService.updateBrand(body);
  }

  @Mutation(() => String)
  async deleteBrand(@Args('id', { type: () => [Int] }) id: number[]) {
    return await this.brandService.deleteBrand(id);
  }

  @Mutation(() => Brand)
  async createBrand(@Args('body') body: BrandDto) {
    return await this.brandService.createBrand(body);
  }
}
