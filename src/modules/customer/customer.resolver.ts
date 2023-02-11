import {
  Args,
  Query,
  Resolver,
  Int,
  Mutation,
  OmitType,
} from '@nestjs/graphql';
import { CustomerDto } from '../../auth/dto/customer/customer.dto';
import { UserResponse } from '../../auth/dto/user/user-response';
import { Customer } from './customer.entity';
import { CustomerService } from '../customer/customer.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private customerService: CustomerService) {}

  @Query(() => [Customer], { name: 'listCustomerAccount' })
  async getAll(
    @Args('id', { type: () => Int, nullable: true })
    id: number,
  ) {
    return await this.customerService.getAllCustomerAccount(id);
  }

  @Mutation(() => UserResponse)
  async updateCustomerAccount(@Args('body') data: CustomerDto) {
    return await this.customerService.updateCustomerAccount(data);
  }

  @Mutation(() => UserResponse)
  async deleteCustomerAccount(@Args('id', { type: () => [Int] }) id: number[]) {
    return await this.customerService.deleteCustomerAccount(id);
  }

  @Mutation(() => UserResponse)
  async createCustomerAccount(@Args('body') data: CustomerDto) {
    return await this.customerService.createCustomerAccount(data);
  }
}
