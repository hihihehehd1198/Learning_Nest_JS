import { AWSService } from 'src/shared/aws.service';

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
import { FileBody } from 'src/shared/utils';
import { FileUploadDTO } from 'src/auth/dto/fileUpload/file-upload.dto';
import { type } from 'os';

@Resolver()
export class BannerResolver {
  constructor(private bannerService: BannerService, private awsService: AWSService) { }
  @Query(() => [Banner])
  async getAllBanner(@Args('id', { nullable: true }) id?: number) {
    return this.bannerService.getBanner(id);
  }

  @Mutation(() => Banner)
  async updateBanner(@Args('body') data: BannerDto) {
    return this.bannerService.updateBanner(data);
  }

  @Mutation(() => Banner)
  async createBanner(
    @Args('body', { type: () => BannerDto })
    data: BannerDto,
  ) {
    return this.bannerService.createBanner(data);
  }
  @Mutation(() => String)
  async deleteBanner(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.bannerService.deleteBanner(id);
  }

  @Mutation(() => String)
  async uploadFile(@Args('data', { type: () => FileUploadDTO }) data: FileUploadDTO) {
    return await this.awsService.uploadFileToS3(data)
  }

  @Mutation(() => String)
  async getURLS3(@Args('fileName', { type: () => String }) fileName: string) {
    return await this.awsService.getURLS3({ fileName })

  }
}
