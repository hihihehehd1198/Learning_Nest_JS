import { UserService } from './user.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  PartialType,
} from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './user.entity';
import { Optional } from '@nestjs/common';
import { UserUpdateDto } from '../../auth/dto/user/user-response';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) { }

  @Query(() => [User], { name: 'listUser' })
  findAll(
    @Args('id', { type: () => Int, nullable: true })
    id?: number,
  ) {
    console.log(id);
    return id ? this.userService.getAll(id) : this.userService.getAll();
  }

  @Mutation(() => User)
  async updateUser(@Args('user') user: UserUpdateDto) {
    return this.userService.updateUser(user);
  }

  @Mutation(() => String)
  async deleteUser(@Args('id', { type: () => [Int] }) id?: Array<number>) {
    return this.userService.deleteUser(id);
  }


  
}
