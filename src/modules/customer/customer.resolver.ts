import {
  Args,
  Query,
  Resolver,
  Int,
  Mutation,
  OmitType,
} from '@nestjs/graphql';
import { CustomerDto } from '../../auth/dto/customer/customer.dto';
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

  @Mutation(() => Customer)
  async updateCustomerAccount(@Args('body') data: CustomerDto) {
    return await this.customerService.updateCustomerAccount(data);
  }

  @Mutation(() => String)
  async deleteCustomerAccount(@Args('id', { type: () => [Int] }) id: number[]) {
    return await this.customerService.deleteCustomerAccount(id);
  }

  @Mutation(() => Customer)
  async createCustomerAccount(@Args('body') data: CustomerDto) {
    return await this.customerService.createCustomerAccount(data);
  }
}
