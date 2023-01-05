import { BrandService } from './brand.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Brand } from './brand.entity';
import { UserResponse } from '../../auth/dto/user/user-response';
import { BrandDto } from '../../auth/dto/brands/brand.dto';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(private brandService: BrandService) {}
  @Query(() => [Brand])
  async getAllBrand(@Args('id', { nullable: true }) id?: number) {
    return await this.brandService.getBrand(id);
  }

  @Mutation(() => UserResponse)
  async updateBrand(@Args('body') body: BrandDto) {
    return await this.brandService.updateBrand(body);
  }

  @Mutation(() => UserResponse)
  async deleteBrand(@Args('id', { type: () => [Int] }) id: number[]) {
    return await this.brandService.deleteBrand(id);
  }

  @Mutation(() => UserResponse)
  async createBrand(@Args('body') body: BrandDto) {
    return await this.brandService.createBrand(body);
  }
}
