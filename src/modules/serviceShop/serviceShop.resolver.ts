import { ServiceShopService } from './serviceShop.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServiceShop } from './serviceShop.entity';
import { ServiceShopDTO } from '../../auth/dto/serviceShop/serviceShop.dto';

@Resolver(() => ServiceShop)
export class ServiceShopResolver {
  constructor(private serviceShopService: ServiceShopService) { }

  @Query(() => [ServiceShop])
  async getServiceShop(@Args('id', { nullable: true }) id: number) {
    return this.serviceShopService.getServiceShop(id);
  }

  @Mutation(() => ServiceShop)
  async updateServiceShop(@Args('body') data: ServiceShopDTO) {
    return this.serviceShopService.updateServiceShop(data);
  }

  @Mutation(() => String)
  async deleteServiceShop(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.serviceShopService.deleteServiceShop(id);
  }
  @Mutation(() => ServiceShop)
  async createServiceShop(@Args('body') data: ServiceShopDTO) {
    return this.serviceShopService.createServiceShop(data);
  }

}
