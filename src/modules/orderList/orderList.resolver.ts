import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order } from './orderList.entity';
import { OrderService } from './orderList.service';
import { OrderDTO } from './orderList.dto';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(@Args('data') data: OrderDTO) {
    return await this.orderService.createOrder(data);
  }
  @Mutation(() => Order)
  async updateOrder(@Args('data') data: OrderDTO) {
    return await this.orderService.updateOrder(data);
  }

  @Mutation(() => String)
  async deleteOrder(
    @Args('listId', { type: () => [Number] }) listId: number[],
  ) {
    return await this.orderService.deleteOrder(listId);
  }
  @Query(() => [Order])
  async getOrder(@Args('id', { type: () => Int, nullable: true }) id?: number) {
    return await this.orderService.getOrder(id);
  }
}
