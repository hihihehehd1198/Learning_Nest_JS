import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BrandDto } from '../../auth/dto/brands/brand.dto';
import { CategoryDTO } from '../../auth/dto/category/category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) { }

  @Query(() => [Category])
  async getCategory(@Args('id', { nullable: true }) id: number) {
    return await this.categoryService.getCategory(id);
  }

  @Mutation(() => Category)
  async updateCategory(@Args('body') body: CategoryDTO) {
    return await this.categoryService.updateCategory(body);
  }

  @Mutation(() => Category)
  async createCategory(@Args('body') body: CategoryDTO) {
    return await this.categoryService.createCategory(body);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('id', { type: () => [Int] }) id: number[]) {
    return await this.categoryService.deleteCategory(id);
  }
}
