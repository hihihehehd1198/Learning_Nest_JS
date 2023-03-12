import { ArticleService } from './article.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Article } from './article.entity';
import { UserResponse } from '../../auth/dto/user/user-response';
import { ArticleDto } from '../../auth/dto/article/article.dto';
import { type } from 'os';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private articleService: ArticleService) { }
  @Query(() => [Article])
  async getArticle(
    @Args('id', { type: () => Int, nullable: true }) id: number,
  ) {
    return await this.articleService.getArticle(id);
  }

  @Mutation(() => UserResponse)
  async createArticle(@Args('data') data: ArticleDto) {
    return await this.articleService.createArticle(data);
  }

  @Mutation(() => UserResponse)
  async updateArticle(@Args('data') data: ArticleDto) {
    return await this.articleService.updateArticle(data);
  }

  @Mutation(() => UserResponse)
  async deleteArticle(@Args('id', { type: () => [Int], nullable: false }) id: number[]) {
    return await this.articleService.deleteArticle(id);
  }
}
