import { ArticleService } from './article.service';
import { Args, Int, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { Article } from './article.entity';

import { ArticleDto } from '../../auth/dto/article/article.dto';



@Resolver(() => Article)
export class ArticleResolver {
  constructor(private articleService: ArticleService) { }
  @Query(() => [Article])
  async getArticle(
    @Args('id', { type: () => Int, nullable: true }) id: number,
  ) {
    return await this.articleService.getArticle(id);
  }

  @Mutation(() => Article)
  async createArticle(@Args('data') data: ArticleDto) {
    return await this.articleService.createArticle(data);
  }

  @Mutation(() => Article)
  async updateArticle(@Args('data') data: ArticleDto) {
    return await this.articleService.updateArticle(data);
  }

  @Mutation(() => String)
  async deleteArticle(@Args('id', { type: () => [Int], nullable: false }) id: number[]) {
    return await this.articleService.deleteArticle(id);
  }
}
