import {
  extend,
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { User } from '../../../modules/user/user.entity';
// import { User } from '../../../modules/user/user.entity'

@ObjectType()
export class UserResponse {
  @Field()
  response: string;
}

@InputType()
export class UserUpdateDto {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String!, { nullable: true })
  username?: string;
  @Field(() => String!, { nullable: true })
  email?: string;
  @Field(() => String!, { nullable: true })
  Role?: string;

  @Field(() => String!, { nullable: true })
  PhoneNumber?: string;
}
