import { UserResponse } from './../../auth/dto/user/user-response';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  OmitType,
  Int,
} from '@nestjs/graphql';
import { Banner } from './banner.entity';
import { BannerService } from './banner.service';
import { BannerDto } from '../../auth/dto/banner/banner.dto';

@Resolver()
export class BannerResolver {
  constructor(private bannerService: BannerService) {}
  @Query(() => [Banner])
  async getAllBanner(@Args('id', { nullable: true }) id?: number) {
    return this.bannerService.getBanner(id);
  }

  @Mutation(() => UserResponse)
  async updateBanner(@Args('body') data: BannerDto) {
    return this.bannerService.updateBanner(data);
  }

  @Mutation(() => UserResponse)
  async createBanner(
    @Args('body', { type: () => BannerDto })
    data: BannerDto,
  ) {
    return this.bannerService.createBanner(data);
  }
  @Mutation(() => UserResponse)
  async deleteBanner(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.bannerService.deleteBanner(id);
  }
}
